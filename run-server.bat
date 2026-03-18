@echo off
echo Starting InfoDash Hub Local Server...
echo.
echo Attempting to use 'npx serve'...
npx -y serve -p 3000 .
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo 'npx serve' failed. Trying Python...
    python -m http.server 3000
)
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo Failed to start server. Please install Node.js or Python.
    pause
)
