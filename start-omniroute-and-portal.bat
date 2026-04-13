@echo off
rem start-omniroute-and-portal.bat
rem Usage:
rem   start-omniroute-and-portal.bat        -> starts OmniRoute (if installed) and starts portal dev (npm run dev)
rem   start-omniroute-and-portal.bat reset  -> resets OmniRoute admin password to 'flamengoxD' before starting

setlocal

rem -- configuration
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

rem Start OmniRoute
echo Starting OmniRoute...
if exist "%OMNI_CMD%" (
  start "OmniRoute" "%OMNI_CMD%"
) else (
  echo OmniRoute command not found at %OMNI_CMD%, attempting to start from PATH...
  start "OmniRoute" cmd /c "omniroute"
)

rem Give OmniRoute a few seconds to initialize
timeout /t 6 /nobreak >nul

rem Open OmniRoute dashboard
start "OmniRoute UI" "http://127.0.0.1:20128"

rem Start the portal dev server (assumes this .bat is placed in project root)
cd /d "%~dp0"
echo Starting Portal (npm run dev) in new window...
start "Portal Dev" cmd /k "npm run dev"

echo All done. Close this window to finish.
endlocal
