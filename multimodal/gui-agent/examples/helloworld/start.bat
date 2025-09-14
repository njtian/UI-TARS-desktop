@echo off
:: GUI Agent Hello World Startup Script (Windows)
:: 设置控制台编码为 UTF-8
chcp 65001 >nul

setlocal enabledelayedexpansion

echo 🚀 GUI Agent Hello World 启动脚本
echo.

:: Check environment variables
if "%GEMINI_API_KEY%"=="" (
    echo [ERROR] GEMINI_API_KEY environment variable is not set
    echo.
    echo Please enter your Gemini API Key:
    set /p GEMINI_API_KEY=API Key: 
    if "!GEMINI_API_KEY!"=="" (
        echo [ERROR] API Key cannot be empty
        pause
        exit /b 1
    )
    echo [INFO] API Key set temporarily for this session
)

echo ✅ 检测到 Gemini API Key

:: 检查是否在正确的目录
if not exist "package.json" (
    echo ❌ 错误: 请在 helloworld 示例目录中运行此脚本
    echo cd multimodal\gui-agent\examples\helloworld
    pause
    exit /b 1
)

echo ✅ 当前目录正确

:: 安装依赖
echo.
echo 📦 安装依赖...
pnpm install

echo.
echo 🎯 选择运行模式:
echo 1. 桌面操作示例
echo 2. 浏览器操作示例
echo 3. 使用配置文件启动 (推荐)
echo.

set /p choice=请选择 (1-3): 

if "%choice%"=="1" (
    echo.
    echo 🖥️  启动桌面操作示例...
    pnpm run demo:computer
) else if "%choice%"=="2" (
    echo.
    echo 🌐 启动浏览器操作示例...
    pnpm run demo:browser
) else if "%choice%"=="3" (
    echo.
    echo ⚙️  使用配置文件启动...
    echo 这将启动完整的 GUI Agent 服务，包含 Web UI
    npx @agent-tars/cli --config=tarko.config.ts
) else (
    echo ❌ 无效选择
    pause
    exit /b 1
)

pause