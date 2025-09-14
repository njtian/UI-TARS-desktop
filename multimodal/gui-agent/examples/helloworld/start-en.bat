@echo off
:: GUI Agent Hello World Startup Script (Windows - English)

setlocal enabledelayedexpansion

echo ============================================
echo   GUI Agent Hello World Startup Script
echo ============================================
echo.

:: Check environment variables
if "%GEMINI_API_KEY%"=="" (
    echo [ERROR] GEMINI_API_KEY environment variable is not set
    echo.
    echo Please set your Gemini API Key first:
    echo   set GEMINI_API_KEY=your-api-key
    echo.
    echo You can get your API key from: https://ai.google.dev/
    echo.
    pause
    exit /b 1
)

echo [OK] Gemini API Key detected

:: Check if in correct directory
if not exist "package.json" (
    echo [ERROR] Please run this script in the helloworld example directory
    echo   cd multimodal\gui-agent\examples\helloworld
    pause
    exit /b 1
)

echo [OK] Current directory is correct

:: Install dependencies
echo.
echo [INFO] Installing dependencies...
pnpm install

echo.
echo ============================================
echo   Choose Running Mode:
echo ============================================
echo 1. Desktop Operation Example
echo 2. Browser Operation Example  
echo 3. Start with Config File (Recommended)
echo.

set /p choice=Please choose (1-3): 

if "%choice%"=="1" (
    echo.
    echo [INFO] Starting desktop operation example...
    pnpm run demo:computer
) else if "%choice%"=="2" (
    echo.
    echo [INFO] Starting browser operation example...
    pnpm run demo:browser
) else if "%choice%"=="3" (
    echo.
    echo [INFO] Starting with config file...
    echo This will start the complete GUI Agent service with Web UI
    npx @agent-tars/cli --config=tarko.config.ts
) else (
    echo [ERROR] Invalid choice
    pause
    exit /b 1
)

pause