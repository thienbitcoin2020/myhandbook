@echo off
setlocal

echo Starting a loopback-only preview at http://127.0.0.1:8080 ...

py -3 --version >nul 2>&1
if %errorlevel% equ 0 (
    py -3 -m http.server 8080 --bind 127.0.0.1
    goto :end
)

python --version >nul 2>&1
if %errorlevel% equ 0 (
    python -m http.server 8080 --bind 127.0.0.1
    goto :end
)

echo.
echo Python 3 is required. No package will be downloaded or executed automatically.
pause
exit /b 1

:end
endlocal
