<#
bootstrap-windows.ps1

Purpose:
- Prepare a Windows workstation for the Portal + OmniRoute + n8n.
- Installs (global) npm packages: omniroute and n8n (when possible).
- Creates `start-omniroute-and-portal.bat` in the workspace (same behavior as in repo).
- Attempts to start OmniRoute, reset admin password to 'flamengoxD' and start n8n.

Usage (from the project root):
  PowerShell -ExecutionPolicy Bypass -File .\bootstrap-windows.ps1
  # To skip password reset, run with -NoPasswordReset

Notes:
- Requires Node.js >= 18 and npm on PATH. If global npm installs fail, re-run as Administrator.
- This script is best run in an interactive session so you can accept elevation when necessary.
#>

param(
  [switch]$NoPasswordReset,
  [string]$NewPassword = 'flamengoxD'
)

function Write-Log($m){ Write-Host "[bootstrap] $m" }

Write-Log "Starting bootstrap..."

# Check Node/NPM
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
  Write-Host "ERROR: Node.js not found on PATH. Please install Node.js (LTS >= 18) and re-run."
  Write-Host "Download: https://nodejs.org/en/download/"
  exit 2
}

$nodeVer = (& node --version) -replace "v",""
Write-Log "Node version: $nodeVer"

if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
  Write-Host "ERROR: npm not found on PATH. Install Node.js which includes npm."
  exit 2
}

Write-Log "Installing global npm packages: omniroute, n8n (may require admin)..."
try {
  npm install -g omniroute n8n --no-progress | Out-Host
} catch {
  Write-Host "Global install failed. Try re-running PowerShell as Administrator and run this script again."
}

# Create start-omniroute-and-portal.bat in workspace
$batPath = Join-Path -Path (Get-Location) -ChildPath 'start-omniroute-and-portal.bat'
Write-Log "Writing $batPath"
$batContent = @'
@echo off
rem start-omniroute-and-portal.bat
rem Usage:
rem   start-omniroute-and-portal.bat        -> starts OmniRoute (if installed) and starts portal dev (npm run dev)
rem   start-omniroute-and-portal.bat reset  -> resets OmniRoute admin password to 'flamengoxD' before starting

setlocal
set NEW_PASS=flamengoxD
set OMNI_PS=%APPDATA%\npm\omniroute-reset-password.ps1
set OMNI_CMD=%APPDATA%\npm\omniroute.cmd

echo ===============================
echo OmniRoute + Portal Starter
echo ===============================

if "%1"=="reset" (
  echo Reset mode: will attempt to reset OmniRoute admin password to '%NEW_PASS%'.
  if exist "%OMNI_PS%" (
    echo Running reset script at %OMNI_PS% ...
    powershell -NoProfile -Command "$pw='%NEW_PASS%'; $input = $pw + "`n" + $pw + "`n"; $input | & '%OMNI_PS%'; exit $LASTEXITCODE"
    if errorlevel 1 (
      echo WARNING: reset script failed or DB not found. Make sure OmniRoute was started at least once.
    ) else (
      echo Password reset attempted (check output above).
    )
  ) else (
    echo Reset script not found at %OMNI_PS%. Trying npx fallback...
    powershell -NoProfile -Command "$pw='%NEW_PASS%'; $input = $pw + "`n" + $pw + "`n"; $input | npx omniroute-reset-password"
  )
  echo.
)

echo Starting OmniRoute...
if exist "%OMNI_CMD%" (
  start "OmniRoute" "%OMNI_CMD%"
) else (
  echo OmniRoute command not found at %OMNI_CMD%, attempting to start from PATH...
  start "OmniRoute" cmd /c "omniroute"
)

timeout /t 6 /nobreak >nul

start "OmniRoute UI" "http://127.0.0.1:20128"

cd /d "%~dp0"
echo Starting Portal (npm run dev) in new window...
start "Portal Dev" cmd /k "npm run dev"

echo All done. Close this window to finish.
endlocal
'@

Set-Content -Path $batPath -Value $batContent -Encoding ASCII

Write-Log "Attempting to start OmniRoute now..."

# Start OmniRoute (best-effort) using installed shim
try {
  $omniCmd = Join-Path $env:APPDATA 'npm\omniroute.cmd'
  if (Test-Path $omniCmd) {
    Start-Process -FilePath $omniCmd -WindowStyle Minimized
    Write-Log "Started OmniRoute (via $omniCmd)"
  } else {
    if (Get-Command omniroute -ErrorAction SilentlyContinue) {
      Start-Process -FilePath "omniroute" -WindowStyle Minimized
      Write-Log "Started OmniRoute from PATH"
    } else {
      Write-Log "OmniRoute binary not found; ensure global npm install succeeded or run this script as Admin."
    }
  }
} catch {
  Write-Host "Error starting OmniRoute: $_"
}

Start-Sleep -Seconds 6

if (-not $NoPasswordReset) {
  Write-Log "Attempting password reset to provided value (this will only work if OmniRoute created its DB)."
  try {
    $resetPs = Join-Path $env:APPDATA 'npm\omniroute-reset-password.ps1'
    if (Test-Path $resetPs) {
      $pw = $NewPassword
      $input = $pw + "`n" + $pw + "`n"
      $input | & $resetPs
    } else {
      Write-Log "Reset script not found; attempting npx fallback..."
      $pw = $NewPassword
      $input = $pw + "`n" + $pw + "`n"
      $input | npx omniroute-reset-password
    }
  } catch {
    Write-Log "Password reset attempt failed (see above). If DB not found, start OmniRoute once and retry."
  }
}

Write-Log "Installing/ensuring n8n is available (global install)..."
try {
  npm install -g n8n --no-progress | Out-Host
  Write-Log "n8n installed (or already present)."
} catch {
  Write-Host "n8n global install failed. You may need to run as Administrator."
}

Write-Log "Starting n8n in background (n8n start)..."
try {
  Start-Process -FilePath "n8n" -ArgumentList "start" -WindowStyle Minimized
  Write-Log "n8n started (background)."
} catch {
  Write-Log "Failed to start n8n automatically. Run 'n8n start' manually or as a service."
}

Write-Log "Bootstrap finished. If anything failed, re-run as Administrator or inspect output above."
