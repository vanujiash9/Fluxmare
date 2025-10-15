# fix_imports_more.ps1
# Safer comprehensive import fixer. Creates .bak backups.
$root = Split-Path -Path $MyInvocation.MyCommand.Path -Parent
$src = Join-Path $root 'src'

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
Get-ChildItem -Path $src -Recurse -Include *.ts,*.tsx,*.js,*.jsx | ForEach-Object {
    $file = $_.FullName
    $text = Get-Content -Raw -Encoding UTF8 $file
    $orig = $text
    foreach ($name in $map.Keys) {
        $newpath = $map[$name]

        # patterns to replace: absolute src, leading slash, bare components/, and parented ../components/
        $patterns = @(
            'src/components/' + $name,
            '/components/' + $name,
            'components/' + $name
        )

        # add ../components/Name, ../../components/Name, ... up to 6 levels
        for ($levels = 1; $levels -le 6; $levels++) {
            $prefix = ('../' * $levels)
            $patterns += ($prefix + 'components/' + $name)
        }

        foreach ($p in $patterns) {
            $escaped = [regex]::Escape($p)
            # choose replacement: if pattern starts with '/', keep leading slash
            if ($p.StartsWith('/')) { $replacement = '/' + $newpath } else { $replacement = 'src/' + $newpath }
            $text = [regex]::Replace($text, $escaped, [regex]::Escape($replacement))
            # also replace occurrences inside quotes (single/double) by matching the raw pattern
            $text = $text -replace $escaped, $replacement
        }
    }
    if ($text -ne $orig) {
        $bak = "$file.bak"
        if (-not (Test-Path $bak)) { Copy-Item -Path $file -Destination $bak -Force }
        Set-Content -Path $file -Value $text -Encoding UTF8
        $changed += $file
        Write-Host "Updated imports in: $file"
    }
}
Write-Host "Total files changed: $($changed.Count)"
if ($changed.Count -gt 0) { $changed | ForEach-Object { Write-Host "- $_" } }
