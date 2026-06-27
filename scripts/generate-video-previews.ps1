[CmdletBinding()]
param(
    [string]$Ffmpeg = "ffmpeg"
)

$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $PSScriptRoot
$outputDirectory = Join-Path $projectRoot "static/videos/previews"

$previews = @(
    @{
        Name = "gaming-long-form-preview.mp4"
        Source = "static/videos/gaming/miyuna-retour-gaming-long.mp4"
        Start = "00:00:30"
        Scale = "960:-2"
    },
    @{
        Name = "gaming-short-form-preview.mp4"
        Source = "static/videos/gaming/flare-mort-short.mp4"
        Start = "00:00:02"
        Scale = "-2:960"
    },
    @{
        Name = "explainer-short-form-preview.mp4"
        Source = "static/videos/explainer/rant-explicatif.mp4"
        Start = "00:00:02"
        Scale = "-2:960"
    },
    @{
        Name = "business-promo-preview.mp4"
        Source = "static/videos/business/ugc.mp4"
        Start = "00:00:02"
        Scale = "-2:960"
    },
    @{
        Name = "other-format-preview.mp4"
        Source = "static/videos/other/funky-live-cuisine-other.mp4"
        Start = "00:01:34"
        Scale = "960:-2"
    }
)

New-Item -ItemType Directory -Force -Path $outputDirectory | Out-Null

foreach ($preview in $previews) {
    $sourcePath = Join-Path $projectRoot $preview.Source
    $outputPath = Join-Path $outputDirectory $preview.Name

    if (-not (Test-Path -LiteralPath $sourcePath)) {
        throw "Missing source video: $sourcePath"
    }

    Write-Host "Generating $($preview.Name)"

    & $Ffmpeg `
        -hide_banner `
        -loglevel error `
        -y `
        -ss $preview.Start `
        -i $sourcePath `
        -t 8 `
        -an `
        -vf "fps=30,scale=$($preview.Scale):flags=lanczos" `
        -c:v libx264 `
        -preset slow `
        -crf 29 `
        -pix_fmt yuv420p `
        -g 30 `
        -keyint_min 30 `
        -sc_threshold 0 `
        -movflags +faststart `
        $outputPath

    if ($LASTEXITCODE -ne 0) {
        throw "ffmpeg failed for $($preview.Name)"
    }
}

Write-Host "Generated $($previews.Count) optimized previews in $outputDirectory"
