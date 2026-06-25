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
        [IO.File]::WriteAllText($localTemp, $Content, [Text.UTF8Encoding]::new($false))
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

Assert-Command "ssh"
Assert-Command "scp"

$repositoryRoot = Split-Path -Parent $PSScriptRoot
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
if ($publicURL -notmatch '^https://') {
    throw "APP_PUBLIC_URL must use HTTPS in $EnvFile."
}

$target = "$SshUser@$SshHost"
$remoteEnv = "/tmp/editing-portfolio-env-$PID"
$remoteScript = "/tmp/editing-portfolio-deploy-$PID.sh"
$repositoryURL = "https://github.com/Palawizard/editing-portfolio.git"

$deployScript = @'
#!/bin/sh
set -eu

STACK="$1"
REPOSITORY="$2"
BRANCH="$3"
SOURCE_ENV="$4"

cleanup() {
  rm -f "$SOURCE_ENV" "$0"
}
trap cleanup EXIT

command -v git >/dev/null
command -v docker >/dev/null
docker compose version >/dev/null
docker network inspect web >/dev/null

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
COMPOSE_ARGS="--env-file .env.prod -f docker/docker-compose.yml -f docker/docker-compose.prod.yml"
sudo docker compose $COMPOSE_ARGS config >/tmp/editing-portfolio-compose.yml
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

$confirmation = Read-Host "Deploy editing portfolio? Type 'deploy' to continue"
if ($confirmation -ne "deploy") {
    Write-Host "Deployment cancelled."
    exit 0
}

try {
    Send-TextFile $target $SshPort $remoteEnv $envContent
    Send-TextFile $target $SshPort $remoteScript $deployScript
    & ssh -t -p $SshPort $target "sh '$remoteScript' '$RemoteStack' '$repositoryURL' '$Branch' '$remoteEnv'"
    if ($LASTEXITCODE -ne 0) {
        throw "Remote deployment failed."
    }
} catch {
    & ssh -p $SshPort $target "rm -f '$remoteEnv' '$remoteScript'" 2>$null
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
