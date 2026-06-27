[CmdletBinding()]
param(
    [string]$Ffmpeg = "ffmpeg"
)

$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $PSScriptRoot
$outputDirectory = Join-Path $projectRoot "static/videos/previews"

$previews = @(
    @{
        Name = "miyuna-retour-gaming-long-preview.mp4"
        Source = "static/videos/gaming/miyuna-retour-gaming-long.mp4"
        Start = "00:00:30"
        Scale = "960:-2"
    },
    @{
        Name = "genshin-whale-accident-long-preview.mp4"
        Source = "static/videos/gaming/genshin-whale-accident-long.mp4"
        Start = "00:00:45"
        Scale = "960:-2"
    },
    @{
        Name = "miyuna-model-reveal-best-of-preview.mp4"
        Source = "static/videos/gaming/miyuna-model-reveal-best-of.mp4"
        Start = "00:00:45"
        Scale = "960:-2"
    },
    @{
        Name = "palawi-fireball-long-preview.mp4"
        Source = "static/videos/gaming/palawi-fireball-long.mp4"
        Start = "00:00:30"
        Scale = "960:-2"
    },
    @{
        Name = "carry-the-glass-long-preview.mp4"
        Source = "static/videos/gaming/carry-the-glass-long.mp4"
        Start = "00:01:00"
        Scale = "960:-2"
    },
    @{
        Name = "funky-beau-fils-long-preview.mp4"
        Source = "static/videos/gaming/funky-beau-fils-long.mp4"
        Start = "00:00:30"
        Scale = "960:-2"
    },
    @{
        Name = "flare-mort-short-preview.mp4"
        Source = "static/videos/gaming/flare-mort-short.mp4"
        Start = "00:00:02"
        Scale = "-2:960"
    },
    @{
        Name = "cs2-random-short-preview.mp4"
        Source = "static/videos/gaming/cs2-random-short.mp4"
        Start = "00:00:02"
        Scale = "-2:960"
    },
    @{
        Name = "cs2-habitude-short-preview.mp4"
        Source = "static/videos/gaming/cs2-habitude-short.mp4"
        Start = "00:00:00"
        Scale = "-2:960"
    },
    @{
        Name = "cs2-totem-short-preview.mp4"
        Source = "static/videos/gaming/cs2-totem-short.mp4"
        Start = "00:00:01"
        Scale = "-2:960"
    },
    @{
        Name = "cs2-peur-short-preview.mp4"
        Source = "static/videos/gaming/cs2-peur-short.mp4"
        Start = "00:00:01"
        Scale = "-2:960"
    },
    @{
        Name = "cs2-type-bizarre-short-preview.mp4"
        Source = "static/videos/gaming/cs2-type-bizarre-short.mp4"
        Start = "00:00:00"
        Scale = "-2:960"
    },
    @{
        Name = "rant-explicatif-preview.mp4"
        Source = "static/videos/explainer/rant-explicatif.mp4"
        Start = "00:00:02"
        Scale = "-2:960"
    },
    @{
        Name = "ugc-preview.mp4"
        Source = "static/videos/business/ugc.mp4"
        Start = "00:00:02"
        Scale = "-2:960"
    },
    @{
        Name = "boursin-preview.mp4"
        Source = "static/videos/business/boursin.mp4"
        Start = "00:00:02"
        Scale = "-2:960"
    },
    @{
        Name = "cheese-naan-preview.mp4"
        Source = "static/videos/business/cheese-naan.mp4"
        Start = "00:00:02"
        Scale = "-2:960"
    },
    @{
        Name = "humour-promo-preview.mp4"
        Source = "static/videos/business/humour-promo.mp4"
        Start = "00:00:02"
        Scale = "-2:960"
    },
    @{
        Name = "naan-preview.mp4"
        Source = "static/videos/business/naan.mp4"
        Start = "00:00:02"
        Scale = "-2:960"
    },
    @{
        Name = "poulet-preview.mp4"
        Source = "static/videos/business/poulet.mp4"
        Start = "00:00:02"
        Scale = "-2:960"
    },
    @{
        Name = "smash-preview.mp4"
        Source = "static/videos/business/smash.mp4"
        Start = "00:00:02"
        Scale = "-2:960"
    },
    @{
        Name = "tacos-preview.mp4"
        Source = "static/videos/business/tacos.mp4"
        Start = "00:00:02"
        Scale = "-2:960"
    },
    @{
        Name = "funky-live-cuisine-other-preview.mp4"
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
