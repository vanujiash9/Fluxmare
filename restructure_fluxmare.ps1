<#
restructure_fluxmare.ps1
Dry-run by default. To apply changes run with -Apply.
Usage:
  .\restructure_fluxmare.ps1          # prints planned moves
  .\restructure_fluxmare.ps1 -Apply  # actually move files
#>
param(
    [switch]$Apply
)

$root = Split-Path -Path $MyInvocation.MyCommand.Path -Parent
Write-Host "Fluxmare root: $root"

# mapping: destination relative to src/components
$moves = @{
    'AdminDashboard.tsx' = 'pages/Admin/AdminDashboard.tsx'
    'FuelConsumptionDashboard.tsx' = 'pages/Fuel/FuelConsumptionDashboard.tsx'
    'ChatBot.tsx' = 'components/chat/ChatBot.tsx'
    'ChatHistory.tsx' = 'components/chat/ChatHistory.tsx'
    'ChatInput.tsx' = 'components/chat/ChatInput.tsx'
    'CompareDialog.tsx' = 'components/shared/CompareDialog.tsx'
    'ComparisonDashboard.tsx' = 'pages/Compare/ComparisonDashboard.tsx'
    'LoginForm.tsx' = 'components/auth/LoginForm.tsx'
    'RegisterForm.tsx' = 'components/auth/RegisterForm.tsx'
    'SettingsDialog.tsx' = 'components/shared/SettingsDialog.tsx'
    'HelpDialog.tsx' = 'components/shared/HelpDialog.tsx'
    'EmptyState.tsx' = 'components/shared/EmptyState.tsx'
}

$componentsDir = Join-Path $root 'src\components'

$planned = @()
foreach ($file in $moves.Keys) {
    $src = Join-Path $componentsDir $file
    $dst = Join-Path $root ('src\' + $moves[$file])
    $planned += [PSCustomObject]@{ File = $file; Src = $src; Dst = $dst }
}

Write-Host "Planned moves (dry-run):`n"
$planned | Format-Table -AutoSize

if ($Apply) {
    foreach ($p in $planned) {
        $dstDir = Split-Path $p.Dst -Parent
        if (!(Test-Path $dstDir)) { New-Item -ItemType Directory -Path $dstDir | Out-Null }
        if (Test-Path $p.Src) {
            Move-Item -Path $p.Src -Destination $p.Dst -Force
            Write-Host "Moved: $($p.File) -> $($p.Dst)"
        } else {
            Write-Host "Source not found: $($p.Src)" -ForegroundColor Yellow
        }
    }
    Write-Host "Move complete. Reminder: update imports if necessary."
} else {
    Write-Host "To apply changes run with -Apply switch. No files changed." -ForegroundColor Cyan
}
