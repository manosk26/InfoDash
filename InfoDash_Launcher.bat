@echo off
title InfoDash Hub Launcher
echo Starting InfoDash Hub...
echo.

:: Get current directory
set PROJECT_DIR=%~dp0
cd /d "%PROJECT_DIR%"

:: Start Python's built-in HTTP server in a separate hidden window or minimized
start /min cmd /c "python -m http.server 3000"

:: Wait a moment for the server to start
timeout /t 2 /nobreak > nul

:: Open the default browser to the local server
start http://localhost:3000

echo InfoDash Hub is now running!
echo You can close this window.
timeout /t 5 > nul
exit
