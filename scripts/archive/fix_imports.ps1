# fix_imports.ps1
# Fix import paths after moving components. Creates .bak backups for edited files.

$root = Split-Path -Path $MyInvocation.MyCommand.Path -Parent
$src = Join-Path $root 'src'

# mapping: component base name -> new path relative to src (using forward slashes)
$map = @{
    'FuelConsumptionDashboard' = 'pages/Fuel/FuelConsumptionDashboard'
    'EmptyState' = 'components/shared/EmptyState'
    'AdminDashboard' = 'pages/Admin/AdminDashboard'
    'ComparisonDashboard' = 'pages/Compare/ComparisonDashboard'
    'CompareDialog' = 'components/shared/CompareDialog'
    'HelpDialog' = 'components/shared/HelpDialog'
    'ChatHistory' = 'components/chat/ChatHistory'
    'ChatInput' = 'components/chat/ChatInput'
    'SettingsDialog' = 'components/shared/SettingsDialog'
    'ChatBot' = 'components/chat/ChatBot'
    'RegisterForm' = 'components/auth/RegisterForm'
    'LoginForm' = 'components/auth/LoginForm'
}

$changed = @()
Get-ChildItem -Path $src -Recurse -Include *.tsx,*.ts | ForEach-Object {
    $file = $_.FullName
    $text = Get-Content -Raw -Encoding UTF8 $file
    $orig = $text

    foreach ($name in $map.Keys) {
        $newpath = $map[$name]
        # common patterns to replace
        # 1) src/components/Name -> src/<newpath>
        $text = $text -replace ([regex]::Escape("src/components/$name")), "src/$newpath"
        # 2) /components/Name -> /<newpath>
        $text = $text -replace ([regex]::Escape("/components/$name")), "/$newpath"
        # 3) ../components/Name or ../../components/Name -> 'src/<newpath>' (absolute)
        $text = $text -replace "(\.\./)+components/$name", "src/$newpath"
        # 4) from 'components/Name' (no prefix)
        $text = $text -replace ([regex]::Escape("components/$name")), "$newpath"
    }

    if ($text -ne $orig) {
        # backup
        $bak = "$file.bak"
        if (-not (Test-Path $bak)) { Copy-Item -Path $file -Destination $bak -Force }
        Set-Content -Path $file -Value $text -Encoding UTF8
        $changed += $file
        Write-Host "Updated imports in: $file"
    }
}

Write-Host "Total files changed: $($changed.Count)"
if ($changed.Count -gt 0) { $changed | ForEach-Object { Write-Host "- $_" } }
