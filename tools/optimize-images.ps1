param(
  [string]$Root = "assets",
  [int]$MinSizeKB = 500,
  [int]$MaxWidth = 1920,
  [int]$Quality = 82,
  [switch]$WriteWebp,
  [switch]$UpdateHtml,
  [switch]$DryRun
)

$ErrorActionPreference = "Stop"

function Get-RepoRoot {
  return (Get-Location).Path
}

function Ensure-Magick {
  $cmd = Get-Command magick -ErrorAction SilentlyContinue
  if ($null -ne $cmd) { return $cmd.Source }

  $candidates = @()
  $programFiles = @($env:ProgramFiles, ${env:ProgramFiles(x86)}) | Where-Object { -not [string]::IsNullOrWhiteSpace($_) }
  foreach ($pf in $programFiles) {
    $candidates += Get-ChildItem -LiteralPath $pf -Recurse -Filter magick.exe -ErrorAction SilentlyContinue |
      Select-Object -ExpandProperty FullName
  }

  $candidates = @($candidates | Sort-Object -Unique)
  if ($candidates.Count -gt 0) { return $candidates[0] }

  throw @"
Image optimization requires ImageMagick (magick.exe) but it was not found.

Install (Windows):
  winget install ImageMagick.ImageMagick --accept-source-agreements --accept-package-agreements

Then re-run:
  powershell -ExecutionPolicy Bypass -File tools\optimize-images.ps1 -WriteWebp -UpdateHtml
"@
}

function Get-ImageFiles([string]$rootPath, [int]$minSizeKB) {
  $minBytes = $minSizeKB * 1024
  return Get-ChildItem -LiteralPath $rootPath -Recurse -File |
    Where-Object {
      $_.Length -ge $minBytes -and
      $_.FullName -notmatch '\\\.git\\' -and
      $_.FullName -notmatch '\\node_modules\\' -and
      $_.Name -match '\.(png|jpe?g)$'
    }
}

function Get-WebpPath([string]$fullPath) {
  $dir = Split-Path -Parent $fullPath
  $base = [System.IO.Path]::GetFileNameWithoutExtension($fullPath)
  return (Join-Path $dir ($base + ".webp"))
}

function Convert-ToWebp([string]$magickPath, [string]$inputPath, [string]$outputPath, [int]$maxWidth, [int]$quality, [switch]$dryRun) {
  $args = @(
    $inputPath,
    "-strip",
    "-auto-orient",
    "-resize", ("{0}x{0}>" -f $maxWidth),
    "-quality", "$quality",
    "-define", "webp:method=6",
    $outputPath
  )

  if ($dryRun) {
    Write-Host ("DRYRUN `"$magickPath`" " + ($args -join " "))
    return
  }

  & $magickPath @args | Out-Null
}

function Update-HtmlReferencesToWebp([string]$repoRoot, [switch]$dryRun) {
  $htmlFiles = Get-ChildItem -Path $repoRoot -Recurse -File -Filter *.html |
    Where-Object { $_.FullName -notmatch '\\\.git\\' }

  $attrRegex = [regex]'(?is)\b(?:src|href|poster)\s*=\s*(?:"(?<p>[^"]+)"|''(?<p>[^'']+)'')'
  $urlRegex = [regex]'(?is)\burl\(\s*(?:"(?<p>[^"]+)"|''(?<p>[^'']+)''|(?<p>[^)]+))\s*\)'

  $changedFiles = 0
  $changedRefs = 0

  foreach ($file in $htmlFiles) {
    $content = Get-Content -LiteralPath $file.FullName -Raw
    $original = $content

    $candidates = New-Object 'System.Collections.Generic.Dictionary[string,string]'

    foreach ($m in $attrRegex.Matches($content)) {
      $p = $m.Groups['p'].Value
      if ([string]::IsNullOrWhiteSpace($p)) { continue }
      $raw = $p.Trim()

      $base = $raw.Split('?')[0].Split('#')[0].Trim()
      if (-not ($base -match '\.(png|jpe?g)$')) { continue }

      $webpRef = ($base -replace '\.(png|jpe?g)$', '.webp')
      $webpWithSuffix = $raw -replace [regex]::Escape($base), $webpRef

      try {
        $resolved = Resolve-Path -LiteralPath (Join-Path $file.DirectoryName $base) -ErrorAction Stop
      } catch { continue }

      $webpFull = Get-WebpPath $resolved.Path
      if (Test-Path -LiteralPath $webpFull) {
        if (-not $candidates.ContainsKey($raw)) { $candidates.Add($raw, $webpWithSuffix) }
      }
    }

    foreach ($m in $urlRegex.Matches($content)) {
      $p = $m.Groups['p'].Value
      if ([string]::IsNullOrWhiteSpace($p)) { continue }
      $raw = $p.Trim().Trim('"').Trim("'")

      $base = $raw.Split('?')[0].Split('#')[0].Trim()
      if (-not ($base -match '\.(png|jpe?g)$')) { continue }

      $webpRef = ($base -replace '\.(png|jpe?g)$', '.webp')
      $webpWithSuffix = $raw -replace [regex]::Escape($base), $webpRef

      try {
        $resolved = Resolve-Path -LiteralPath (Join-Path $file.DirectoryName $base) -ErrorAction Stop
      } catch { continue }

      $webpFull = Get-WebpPath $resolved.Path
      if (Test-Path -LiteralPath $webpFull) {
        if (-not $candidates.ContainsKey($raw)) { $candidates.Add($raw, $webpWithSuffix) }
      }
    }

    foreach ($k in $candidates.Keys) {
      $v = $candidates[$k]
      if ($k -eq $v) { continue }
      $content = $content.Replace($k, $v)
    }

    if ($content -ne $original) {
      $changedFiles++
      $changedRefs += $candidates.Count
      if ($dryRun) {
        Write-Host ("DRYRUN would update: " + $file.FullName)
      } else {
        Set-Content -LiteralPath $file.FullName -Value $content -NoNewline
      }
    }
  }

  Write-Host ("HTML updated files: {0}" -f $changedFiles)
  Write-Host ("HTML updated refs:  {0}" -f $changedRefs)
}

$repoRoot = Get-RepoRoot
$rootPath = Join-Path $repoRoot $Root
if (-not (Test-Path -LiteralPath $rootPath)) {
  throw "Root not found: $rootPath"
}

$magickPath = $null
if ($WriteWebp -and (-not $DryRun)) {
  $magickPath = Ensure-Magick
  Write-Host ("Using ImageMagick: {0}" -f $magickPath)
}

$images = Get-ImageFiles $rootPath $MinSizeKB
Write-Host ("Found {0} images >= {1}KB under {2}" -f $images.Count, $MinSizeKB, $Root)

if ($images.Count -gt 0) {
  Write-Host ""
  Write-Host "Top large images:"
  $images |
    Sort-Object Length -Descending |
    Select-Object -First 10 |
    ForEach-Object {
      $kb = [math]::Round($_.Length / 1KB)
      Write-Host ("- {0}KB  {1}" -f $kb, $_.FullName)
    }
  Write-Host ""
}

if ($WriteWebp) {
  $converted = 0
  foreach ($img in $images) {
    $out = Get-WebpPath $img.FullName

    $needs = $true
    if (Test-Path -LiteralPath $out) {
      $inSize = (Get-Item -LiteralPath $img.FullName).Length
      $outSize = (Get-Item -LiteralPath $out).Length
      if ($outSize -gt 0 -and $outSize -le $inSize) { $needs = $false }
    }

    if (-not $needs) { continue }

    Convert-ToWebp -magickPath $magickPath -inputPath $img.FullName -outputPath $out -maxWidth $MaxWidth -quality $Quality -dryRun:$DryRun
    $converted++
    Write-Host ("WEBP: {0} -> {1}" -f $img.FullName, $out)
  }
  Write-Host ("WEBP generated: {0}" -f $converted)
}

if ($UpdateHtml) {
  Update-HtmlReferencesToWebp -repoRoot $repoRoot -dryRun:$DryRun
}
