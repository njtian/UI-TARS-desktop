#!/bin/bash

# GUI Agent Hello World 启动脚本

set -e

echo "🚀 GUI Agent Hello World 启动脚本"
echo ""

# 检查环境变量
if [ -z "$GEMINI_API_KEY" ]; then
    echo "❌ 错误: 未设置 GEMINI_API_KEY 环境变量"
    echo ""
    echo "请先设置你的 Gemini API Key:"
    echo "export GEMINI_API_KEY=\"your-api-key\""
    echo ""
    exit 1
fi

echo "✅ 检测到 Gemini API Key"

# 检查是否在正确的目录
if [ ! -f "package.json" ]; then
    echo "❌ 错误: 请在 helloworld 示例目录中运行此脚本"
    echo "cd multimodal/gui-agent/examples/helloworld"
    exit 1
fi

echo "✅ 当前目录正确"

# 安装依赖
echo ""
echo "📦 安装依赖..."
pnpm install

echo ""
echo "🎯 选择运行模式:"
echo "1. 桌面操作示例"
echo "2. 浏览器操作示例"
echo "3. 使用配置文件启动 (推荐)"
echo ""

read -p "请选择 (1-3): " choice

case $choice in
    1)
        echo ""
        echo "🖥️  启动桌面操作示例..."
        pnpm run demo:computer
        ;;
    2)
        echo ""
        echo "🌐 启动浏览器操作示例..."
        pnpm run demo:browser
        ;;
    3)
        echo ""
        echo "⚙️  使用配置文件启动..."
        echo "这将启动完整的 GUI Agent 服务，包含 Web UI"
        npx @agent-tars/cli --config=tarko.config.ts
        ;;
    *)
        echo "❌ 无效选择"
        exit 1
        ;;
esac