#!/usr/bin/env pwsh

[CmdletBinding()]
param(
    [string]$SshHost,
    [string]$SshUser,
    [ValidateRange(1, 65535)]
    [int]$SshPort = 22,
    [string]$RemoteStack = "/opt/dockpanel/stacks/editing-portfolio",
    [string]$Branch = "dev",
    [string]$EnvFile,
    [string]$LocalMediaRoot,
    [switch]$SkipPublicCheck
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function Read-RequiredValue {
    param(
        [string]$Prompt,
        [string]$CurrentValue
    )

    if (-not [string]::IsNullOrWhiteSpace($CurrentValue)) {
        return $CurrentValue.Trim()
    }

    do {
        $value = Read-Host $Prompt
    } while ([string]::IsNullOrWhiteSpace($value))

    return $value.Trim()
}

function Assert-Command {
    param([string]$Name)

    if (-not (Get-Command $Name -ErrorAction SilentlyContinue)) {
        throw "Required command '$Name' was not found."
    }
}

function Get-EnvValue {
    param(
        [string]$Content,
        [string]$Name
    )

    $match = [regex]::Match($Content, "(?m)^\s*$([regex]::Escape($Name))\s*=\s*(.*)\s*$")
    if (-not $match.Success) {
        return ""
    }

    return $match.Groups[1].Value.Trim().Trim('"').Trim("'")
}

function Send-TextFile {
    param(
        [string]$Target,
        [int]$Port,
        [string]$RemotePath,
        [string]$Content
    )

    if ($RemotePath -notmatch '^/[a-zA-Z0-9._/-]+$') {
        throw "Remote path contains unsupported characters: $RemotePath"
    }

    $localTemp = Join-Path ([IO.Path]::GetTempPath()) "editing-portfolio-$([Guid]::NewGuid().ToString('N')).tmp"
    try {
        $unixContent = $Content.Replace("`r`n", "`n").Replace("`r", "`n")
        [IO.File]::WriteAllText($localTemp, $unixContent, [Text.UTF8Encoding]::new($false))
        & scp -P $Port $localTemp "${Target}:$RemotePath"
        if ($LASTEXITCODE -ne 0) {
            throw "Failed to upload $RemotePath."
        }
    } finally {
        if (Test-Path -LiteralPath $localTemp) {
            Remove-Item -LiteralPath $localTemp -Force
        }
    }
}

function Get-MediaManifest {
    param([string]$Root)

    if (-not (Test-Path -LiteralPath $Root -PathType Container)) {
        throw "Local media directory not found: $Root"
    }

    $entries = @(
        Get-ChildItem -LiteralPath $Root -Recurse -File -Filter "*.mp4" |
            Sort-Object FullName |
            ForEach-Object {
                $relativePath = [IO.Path]::GetRelativePath($Root, $_.FullName).Replace("\", "/")
                if ($relativePath -notmatch '^[a-zA-Z0-9._/-]+$' -or $relativePath.Contains("..")) {
                    throw "Media path contains unsupported characters: $relativePath"
                }

                [PSCustomObject]@{
                    RelativePath = $relativePath
                    FullName = $_.FullName
                    Length = $_.Length
                    Hash = (Get-FileHash -LiteralPath $_.FullName -Algorithm SHA256).Hash.ToLowerInvariant()
                }
            }
    )

    if ($entries.Count -eq 0) {
        throw "No MP4 files were found in $Root."
    }

    return $entries
}

function Sync-MediaFiles {
    param(
        [string]$Target,
        [int]$Port,
        [string]$LocalRoot,
        [string]$RemoteRoot,
        [string]$RemoteManifest,
        [string]$RemoteChecker,
        [array]$Entries
    )

    $manifestContent = (($Entries | ForEach-Object { "$($_.Hash)`t$($_.RelativePath)" }) -join "`n") + "`n"
    $checkerContent = @'
#!/bin/sh
set -eu

ROOT="$1"
MANIFEST="$2"

while IFS="$(printf '\t')" read -r expected relative; do
  [ -n "$relative" ] || continue
  case "$relative" in
    /*|*..*|*\\*)
      echo "Invalid media path in manifest: $relative" >&2
      exit 1
      ;;
  esac

  actual=$(sha256sum "$ROOT/$relative" 2>/dev/null | awk '{print $1}' || true)
  if [ "$actual" != "$expected" ]; then
    printf '%s\n' "$relative"
  fi
done <"$MANIFEST"
'@

    Send-TextFile $Target $Port $RemoteManifest $manifestContent
    Send-TextFile $Target $Port $RemoteChecker $checkerContent

    $pendingPaths = @(& ssh -p $Port $Target "sh '$RemoteChecker' '$RemoteRoot' '$RemoteManifest'")
    if ($LASTEXITCODE -ne 0) {
        throw "Failed to compare local and remote media files."
    }
    $pendingPaths = @($pendingPaths | Where-Object { -not [string]::IsNullOrWhiteSpace($_) })

    if ($pendingPaths.Count -eq 0) {
        Write-Host "Remote media are already synchronized."
        return
    }

    $entriesByPath = @{}
    foreach ($entry in $Entries) {
        $entriesByPath[$entry.RelativePath] = $entry
    }

    $pendingDirectories = @(
        $pendingPaths |
            ForEach-Object { ($_ -split '/', 2)[0] } |
            Sort-Object -Unique
    )

    $uploadEntries = @(
        $Entries | Where-Object { $pendingDirectories -contains (($_.RelativePath -split '/', 2)[0]) }
    )
    [long]$uploadBytes = 0
    foreach ($entry in $uploadEntries) {
        $uploadBytes += $entry.Length
    }
    foreach ($relativePath in $pendingPaths) {
        if (-not $entriesByPath.ContainsKey($relativePath)) {
            throw "Remote media comparison returned an unknown path: $relativePath"
        }
    }

    $availableKilobytesOutput = & ssh -p $Port $Target "test -d '$RemoteRoot' && test -w '$RemoteRoot' && df -Pk '$RemoteRoot' | awk 'NR == 2 { print `$4 }'"
    if ($LASTEXITCODE -ne 0) {
        throw "Remote media directory must exist and be writable by the SSH user: $RemoteRoot"
    }
    [long]$availableKilobytes = "$availableKilobytesOutput".Trim()
    [long]$requiredKilobytes = [Math]::Ceiling($uploadBytes / 1KB) + 2097152
    if ($availableKilobytes -lt $requiredKilobytes) {
        throw "Not enough free space to synchronize media. Required: $requiredKilobytes KiB; available: $availableKilobytes KiB."
    }

    $localDirectories = @($pendingDirectories | ForEach-Object { Join-Path $LocalRoot $_ })
    Write-Host "Uploading $($pendingDirectories.Count) changed media folder(s) ($([Math]::Round($uploadBytes / 1MB, 1)) MiB)..."
    $scpArguments = @("-r", "-P", "$Port") + $localDirectories + @("${Target}:$RemoteRoot/")
    & scp @scpArguments
    if ($LASTEXITCODE -ne 0) {
        throw "Failed to upload media folders: $($pendingDirectories -join ', ')"
    }
}

Assert-Command "ssh"
Assert-Command "scp"
Assert-Command "git"
Assert-Command "node"

$repositoryRoot = Split-Path -Parent $PSScriptRoot
if ([string]::IsNullOrWhiteSpace($LocalMediaRoot)) {
    $LocalMediaRoot = Join-Path $repositoryRoot "static/videos"
} elseif (-not [IO.Path]::IsPathRooted($LocalMediaRoot)) {
    $LocalMediaRoot = Join-Path $repositoryRoot $LocalMediaRoot
}
$LocalMediaRoot = [IO.Path]::GetFullPath($LocalMediaRoot)

if ([string]::IsNullOrWhiteSpace($EnvFile)) {
    $EnvFile = Join-Path $repositoryRoot ".env.prod"
} elseif (-not [IO.Path]::IsPathRooted($EnvFile)) {
    $EnvFile = Join-Path $repositoryRoot $EnvFile
}
$EnvFile = [IO.Path]::GetFullPath($EnvFile)

if (-not (Test-Path -LiteralPath $EnvFile -PathType Leaf)) {
    throw "Production environment file not found: $EnvFile"
}

$SshHost = Read-RequiredValue "SSH host or IP" $SshHost
$SshUser = Read-RequiredValue "SSH user" $SshUser

if ($SshHost -notmatch '^[a-zA-Z0-9._:-]+$') {
    throw "SSH host contains unsupported characters."
}
if ($SshUser -notmatch '^[a-zA-Z0-9._-]+$') {
    throw "SSH user contains unsupported characters."
}
if ($RemoteStack -notmatch '^/[a-zA-Z0-9._/-]+$') {
    throw "Remote stack path must be absolute and contain no spaces."
}
if ($Branch -notmatch '^[a-zA-Z0-9._/-]+$') {
    throw "Branch contains unsupported characters."
}

$envContent = [IO.File]::ReadAllText($EnvFile)
$publicURL = Get-EnvValue $envContent "APP_PUBLIC_URL"
[Uri]$publicUri = $null
if (-not [Uri]::TryCreate($publicURL, [UriKind]::Absolute, [ref]$publicUri) -or $publicUri.Scheme -ne "https") {
    throw "APP_PUBLIC_URL must use HTTPS in $EnvFile."
}
if ($publicUri.Query -or $publicUri.Fragment) {
    throw "APP_PUBLIC_URL must not contain a query or fragment."
}

$basePath = Get-EnvValue $envContent "BASE_PATH"
if ($basePath -notmatch '^/[a-zA-Z0-9._/-]+$' -or $basePath.EndsWith("/")) {
    throw "BASE_PATH must start with '/', must not end with '/', and must contain no spaces in $EnvFile."
}
if ($publicUri.AbsolutePath -ne $basePath) {
    throw "BASE_PATH must match the path in APP_PUBLIC_URL ($($publicUri.AbsolutePath))."
}

$mediaRoot = Get-EnvValue $envContent "MEDIA_ROOT"
if ($mediaRoot -notmatch '^/[a-zA-Z0-9._/-]+$') {
    throw "MEDIA_ROOT must be an absolute server path without spaces in $EnvFile."
}

foreach ($requiredName in @("PUBLIC_FORMSPREE_FORM_ID", "PUBLIC_TURNSTILE_SITE_KEY", "PUBLIC_CONTACT_EMAIL")) {
    if ([string]::IsNullOrWhiteSpace((Get-EnvValue $envContent $requiredName))) {
        throw "$requiredName must be set in $EnvFile."
    }
}

Push-Location $repositoryRoot
try {
    $worktreeStatus = & git status --porcelain
    if ($LASTEXITCODE -ne 0) {
        throw "Failed to inspect the local Git worktree."
    }
    if ($worktreeStatus) {
        throw "The local Git worktree must be clean before deployment. Commit or discard the pending changes first."
    }

    & git fetch origin $Branch --quiet
    if ($LASTEXITCODE -ne 0) {
        throw "Failed to fetch origin/$Branch."
    }

    $localCommit = & git rev-parse "refs/heads/$Branch"
    if ($LASTEXITCODE -ne 0) {
        throw "Local branch '$Branch' does not exist."
    }
    $localCommit = "$localCommit".Trim()

    $remoteCommit = & git rev-parse "refs/remotes/origin/$Branch"
    if ($LASTEXITCODE -ne 0) {
        throw "Remote branch 'origin/$Branch' does not exist."
    }
    $remoteCommit = "$remoteCommit".Trim()
    if ($localCommit -ne $remoteCommit) {
        throw "Local branch '$Branch' must match origin/$Branch before deployment. Push or synchronize it first."
    }

    & node scripts/check-video-assets.mjs
    if ($LASTEXITCODE -ne 0) {
        throw "Local media validation failed."
    }
} finally {
    Pop-Location
}

$mediaEntries = @(Get-MediaManifest $LocalMediaRoot)
$mediaBytes = ($mediaEntries | Measure-Object -Property Length -Sum).Sum

$target = "$SshUser@$SshHost"
$deploymentId = [Guid]::NewGuid().ToString("N")
$remoteTempDir = "/tmp/editing-portfolio-deploy-$deploymentId"
$remoteEnv = "$remoteTempDir/environment"
$remoteScript = "$remoteTempDir/deploy.sh"
$remoteMediaManifest = "$remoteTempDir/media-manifest.tsv"
$remoteMediaChecker = "$remoteTempDir/check-media.sh"
$repositoryURL = "https://github.com/Palawizard/editing-portfolio.git"

$deployScript = @'
#!/bin/sh
set -eu

STACK="$1"
REPOSITORY="$2"
BRANCH="$3"
SOURCE_ENV="$4"
MEDIA_ROOT="$5"
TEMP_DIR=$(dirname "$0")

cleanup() {
  rm -rf "$TEMP_DIR"
}
trap cleanup EXIT

command -v git >/dev/null
command -v docker >/dev/null
sudo docker compose version >/dev/null
sudo docker network inspect web >/dev/null

if [ ! -d "$MEDIA_ROOT" ]; then
  echo "Media directory does not exist: $MEDIA_ROOT" >&2
  exit 1
fi

for path in "$MEDIA_ROOT" /var/lib/docker; do
  available_kb=$(df -Pk "$path" | awk 'NR == 2 { print $4 }')
  if [ -z "$available_kb" ] || [ "$available_kb" -lt 2097152 ]; then
    echo "At least 2 GiB of free space is required on the filesystem containing $path." >&2
    df -h "$path" >&2 || true
    exit 1
  fi
done

sudo mkdir -p "$STACK"
sudo chown "$(id -un):$(id -gn)" "$STACK"

if [ ! -d "$STACK/.git" ]; then
  git clone --branch "$BRANCH" "$REPOSITORY" "$STACK"
else
  cd "$STACK"
  if [ -n "$(git status --porcelain)" ]; then
    echo "Remote repository contains local changes: $STACK" >&2
    exit 1
  fi
  git fetch origin
  git checkout "$BRANCH"
  git pull --ff-only origin "$BRANCH"
fi

sudo install -o root -g root -m 600 "$SOURCE_ENV" "$STACK/.env.prod"

cd "$STACK"
mkdir -p static/videos
sudo docker run --rm \
  --volume "$STACK:/app:ro" \
  --volume "$MEDIA_ROOT:/app/static/videos:ro" \
  --workdir /app \
  node:22-alpine node scripts/check-video-assets.mjs

COMPOSE_ARGS="--project-name editing-portfolio --env-file .env.prod -f docker/docker-compose.prod.yml"
sudo docker compose $COMPOSE_ARGS config >"$TEMP_DIR/compose.yml"
sudo docker compose $COMPOSE_ARGS up -d --build --remove-orphans
sudo docker compose $COMPOSE_ARGS ps

for attempt in $(seq 1 30); do
  if sudo docker compose $COMPOSE_ARGS exec -T portfolio \
    wget -qO- http://127.0.0.1:8080/healthz >/dev/null; then
    echo "Container health check succeeded."
    exit 0
  fi

  if [ "$attempt" -eq 30 ]; then
    sudo docker compose $COMPOSE_ARGS ps >&2 || true
    sudo docker compose $COMPOSE_ARGS logs --tail=80 portfolio >&2 || true
    exit 1
  fi

  sleep 2
done
'@

Write-Host "Deployment target : $target`:$SshPort"
Write-Host "Remote stack      : $RemoteStack"
Write-Host "Git branch        : $Branch"
Write-Host "Public URL        : $publicURL"
Write-Host "Application path  : $basePath"
Write-Host "Local media       : $($mediaEntries.Count) files ($([Math]::Round($mediaBytes / 1MB, 1)) MiB)"
Write-Host "Remote media      : $mediaRoot"

$confirmation = Read-Host "Deploy editing portfolio? Type 'deploy' to continue"
if ($confirmation -ne "deploy") {
    Write-Host "Deployment cancelled."
    exit 0
}

try {
    & ssh -p $SshPort $target "umask 077 && mkdir '$remoteTempDir'"
    if ($LASTEXITCODE -ne 0) {
        throw "Failed to create the private remote staging directory."
    }

    Sync-MediaFiles `
        -Target $target `
        -Port $SshPort `
        -LocalRoot $LocalMediaRoot `
        -RemoteRoot $mediaRoot `
        -RemoteManifest $remoteMediaManifest `
        -RemoteChecker $remoteMediaChecker `
        -Entries $mediaEntries
    Send-TextFile $target $SshPort $remoteEnv $envContent
    Send-TextFile $target $SshPort $remoteScript $deployScript
    & ssh -t -p $SshPort $target "sh '$remoteScript' '$RemoteStack' '$repositoryURL' '$Branch' '$remoteEnv' '$mediaRoot'"
    if ($LASTEXITCODE -ne 0) {
        throw "Remote deployment failed."
    }
} catch {
    & ssh -p $SshPort $target "rm -rf '$remoteTempDir'" 2>$null
    throw
}

if (-not $SkipPublicCheck) {
    try {
        $response = Invoke-WebRequest -Uri "$($publicURL.TrimEnd('/'))/" -MaximumRedirection 5
        Write-Host "Public check succeeded with HTTP $($response.StatusCode)."
    } catch {
        Write-Warning "Deployment succeeded, but the public check failed: $($_.Exception.Message)"
    }
}

Write-Host "Editing portfolio deployment finished."
