# GUI Agent Hello World 启动脚本 (PowerShell)

# 设置控制台编码为 UTF-8
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8

Write-Host "🚀 GUI Agent Hello World 启动脚本" -ForegroundColor Green
Write-Host ""

# 检查环境变量
if (-not $env:GEMINI_API_KEY) {
    Write-Host "❌ 错误: 未设置 GEMINI_API_KEY 环境变量" -ForegroundColor Red
    Write-Host ""
    
    $geminiApiKey = Read-Host "请输入你的 Gemini API Key"
    if ([string]::IsNullOrWhiteSpace($geminiApiKey)) {
        Write-Host "❌ API Key 不能为空" -ForegroundColor Red
        Read-Host "按回车键退出"
        exit 1
    }
    
    $env:GEMINI_API_KEY = $geminiApiKey
    Write-Host "✅ API Key 已临时设置" -ForegroundColor Green
} else {
    Write-Host "✅ 检测到 Gemini API Key" -ForegroundColor Green
}

# 检查是否在正确的目录
if (-not (Test-Path "package.json")) {
    Write-Host "❌ 错误: 请在 helloworld 示例目录中运行此脚本" -ForegroundColor Red
    Write-Host "cd multimodal\gui-agent\examples\helloworld"
    Read-Host "按回车键退出"
    exit 1
}

Write-Host "✅ 当前目录正确" -ForegroundColor Green

# 安装依赖
Write-Host ""
Write-Host "📦 安装依赖..." -ForegroundColor Blue
pnpm install

Write-Host ""
Write-Host "🎯 选择运行模式:" -ForegroundColor Yellow
Write-Host "1. 桌面操作示例"
Write-Host "2. 浏览器操作示例"
Write-Host "3. 使用配置文件启动 (推荐)"
Write-Host ""

$choice = Read-Host "请选择 (1-3)"

switch ($choice) {
    "1" {
        Write-Host ""
        Write-Host "🖥️  启动桌面操作示例..." -ForegroundColor Blue
        pnpm run demo:computer
    }
    "2" {
        Write-Host ""
        Write-Host "🌐 启动浏览器操作示例..." -ForegroundColor Blue
        pnpm run demo:browser
    }
    "3" {
        Write-Host ""
        Write-Host "⚙️  使用配置文件启动..." -ForegroundColor Blue
        Write-Host "这将启动完整的 GUI Agent 服务，包含 Web UI"
        npx @agent-tars/cli --config=tarko.config.ts
    }
    default {
        Write-Host "❌ 无效选择" -ForegroundColor Red
        Read-Host "按回车键退出"
        exit 1
    }
}

Read-Host "按回车键退出"