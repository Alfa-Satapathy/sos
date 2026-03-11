param(
  [switch]$Delete
)

$ErrorActionPreference = "Stop"

function Get-RepoRoot {
  $here = (Get-Location).Path
  return $here
}

function Get-NormalizedRepoRelativePath([string]$repoRoot, [string]$fullPath) {
  $root = (Resolve-Path -LiteralPath $repoRoot).Path
  if (-not $root.EndsWith('\')) { $root = $root + '\' }
  $rootUri = New-Object System.Uri($root)

  $target = (Resolve-Path -LiteralPath $fullPath).Path
  $targetUri = New-Object System.Uri($target)

  $relativeUri = $rootUri.MakeRelativeUri($targetUri)
  $relative = [System.Uri]::UnescapeDataString($relativeUri.ToString())
  return $relative.Replace('\', '/')
}

$repoRoot = Get-RepoRoot

$imageRoot = Join-Path $repoRoot "assets/images"
if (-not (Test-Path $imageRoot)) {
  throw "Expected images folder not found: $imageRoot"
}

$htmlFiles = Get-ChildItem -Path $repoRoot -Recurse -File -Filter *.html

$used = New-Object 'System.Collections.Generic.HashSet[string]'

$attrRegex = [regex]'(?is)\b(?:src|href|poster)\s*=\s*(?:"(?<p>[^"]+)"|''(?<p>[^'']+)'')'
$urlRegex = [regex]'(?is)\burl\(\s*(?:"(?<p>[^"]+)"|''(?<p>[^'']+)''|(?<p>[^)]+))\s*\)'

foreach ($file in $htmlFiles) {
  $content = Get-Content -LiteralPath $file.FullName -Raw

  foreach ($m in $attrRegex.Matches($content)) {
    $p = $m.Groups['p'].Value
    if ([string]::IsNullOrWhiteSpace($p)) { continue }
    $p = $p.Split('?')[0].Split('#')[0].Trim()

    if (-not ($p -match '\.(png|jpe?g|gif|webp|svg|ico)$')) { continue }

    $resolved = $null
    try {
      $resolved = Resolve-Path -LiteralPath (Join-Path $file.DirectoryName $p) -ErrorAction Stop
    } catch {
      continue
    }

    $rel = Get-NormalizedRepoRelativePath $repoRoot $resolved.Path
    if ($rel.StartsWith("assets/images/")) {
      [void]$used.Add($rel)
    }
  }

  foreach ($m in $urlRegex.Matches($content)) {
    $p = $m.Groups['p'].Value
    if ([string]::IsNullOrWhiteSpace($p)) { continue }
    $p = $p.Trim()
    $p = $p.Trim('"').Trim("'")
    $p = $p.Split('?')[0].Split('#')[0].Trim()

    if (-not ($p -match '\.(png|jpe?g|gif|webp|svg|ico)$')) { continue }

    $resolved = $null
    try {
      $resolved = Resolve-Path -LiteralPath (Join-Path $file.DirectoryName $p) -ErrorAction Stop
    } catch {
      continue
    }

    $rel = Get-NormalizedRepoRelativePath $repoRoot $resolved.Path
    if ($rel.StartsWith("assets/images/")) {
      [void]$used.Add($rel)
    }
  }
}

$allImages =
  Get-ChildItem -Path $imageRoot -Recurse -File |
  Where-Object { $_.Name -match '\.(png|jpe?g|gif|webp|svg|ico)$' }

$unused = foreach ($img in $allImages) {
  $rel = Get-NormalizedRepoRelativePath $repoRoot $img.FullName
  if (-not $used.Contains($rel)) { $rel }
}

$unused = $unused | Sort-Object -Unique

Write-Host ("Used images:   {0}" -f $used.Count)
Write-Host ("Total images:  {0}" -f $allImages.Count)
Write-Host ("Unused images: {0}" -f $unused.Count)
Write-Host ""

if ($unused.Count -eq 0) {
  exit 0
}

$unused | ForEach-Object { Write-Host $_ }

if ($Delete) {
  Write-Host ""
  Write-Host "Deleting unused images..."
  foreach ($rel in $unused) {
    $full = Join-Path $repoRoot ($rel.Replace('/', '\'))
    Remove-Item -LiteralPath $full -Force
  }
}
