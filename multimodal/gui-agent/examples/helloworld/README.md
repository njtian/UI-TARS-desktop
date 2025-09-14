# GUI Agent Hello World 示例

这是一个最小化的示例，演示如何使用 multimodal/gui-agent 和 Gemini 2.5 Flash 模型进行 GUI 自动化操作。

## 🚀 特性

- ✅ **最小配置**: 只需要 Gemini API Key 即可运行
- 🎯 **多种操作模式**: 支持桌面和浏览器操作
- 🔧 **完整示例**: 包含编程式和配置文件两种使用方式
- 📱 **跨平台**: 支持 Windows、macOS 和 Linux
- 🌐 **Web UI**: 提供友好的 Web 界面

## 📋 环境要求

- Node.js >= 22.15.0
- pnpm >= 9.x
- Gemini API Key ([获取地址](https://ai.google.dev/))

## 🔧 快速开始

### 1. 设置环境变量

**Linux/macOS:**
```bash
export GEMINI_API_KEY="your-gemini-api-key"
```

**Windows:**
```cmd
set GEMINI_API_KEY=your-gemini-api-key
```

### 2. 安装依赖

```bash
cd multimodal/gui-agent/examples/helloworld
pnpm install
```

### 3. 运行示例

#### 方式一：使用启动脚本 (推荐)

**Linux/macOS:**
```bash
./start.sh
```

**Windows:**
```cmd
start.bat
```

#### 方式二：直接运行

```bash
# 桌面操作示例
pnpm run demo:computer

# 浏览器操作示例
pnpm run demo:browser

# 启动完整服务 (包含 Web UI)
pnpm run start
```

## 📁 文件说明

### 核心文件
- `basic-computer.ts` - 桌面操作基础示例
- `basic-browser.ts` - 浏览器操作基础示例
- `config.ts` - Gemini 模型配置
- `tarko.config.ts` - Agent TARS 配置文件

### 配置文件
- `package.json` - 项目配置和脚本
- `tsconfig.json` - TypeScript 配置
- `.env.example` - 环境变量配置示例

### 启动脚本
- `start.sh` - Linux/macOS 启动脚本
- `start.bat` - Windows 启动脚本

## 🎯 示例说明

### 桌面操作示例 (`basic-computer.ts`)

演示如何：
1. 配置 Gemini 2.5 Flash 模型
2. 创建桌面操作 GUI Agent
3. 执行屏幕截图和分析
4. 处理操作结果

### 浏览器操作示例 (`basic-browser.ts`)

演示如何：
1. 启动 Chrome 浏览器
2. 自动导航到网页
3. 执行搜索操作
4. 分析网页内容

### 配置文件示例 (`tarko.config.ts`)

提供完整的配置选项：
- 模型配置
- 操作器类型
- 系统提示词
- Web UI 设置
- 快照配置

## 🔍 使用技巧

### 1. 调试模式

```bash
# 启用详细日志
DEBUG=true pnpm run demo:computer
```

### 2. 自定义提示词

编辑 `config.ts` 中的 `HELLO_WORLD_SYSTEM_PROMPT` 来定制 AI 助手的行为。

### 3. 切换操作模式

```bash
# 强制使用桌面模式
pnpm run start:computer

# 强制使用浏览器模式
pnpm run start:browser
```

## 🚨 注意事项

- **API Key 安全**: 不要将 API Key 提交到版本控制系统
- **权限要求**: 桌面操作需要相应的系统权限
- **浏览器依赖**: 浏览器操作需要安装 Chrome
- **网络连接**: 需要稳定的网络连接访问 Gemini API
- **API 限制**: Gemini API 可能有速率限制，如果遇到 503 错误请稍后重试

## 🔧 故障排除

### 常见问题

1. **API Key 错误**
   ```
   ❌ GEMINI_API_KEY environment variable is required
   ```
   解决：检查环境变量是否正确设置

2. **网络连接问题**
   ```
   ❌ Failed to connect to Gemini API
   ```
   解决：检查网络连接和 API Key 有效性

3. **权限不足**
   ```
   ❌ Permission denied for screen capture
   ```
   解决：在系统设置中允许屏幕录制权限

4. **API 过载错误**
   ```
   ❌ [503 Service Unavailable] The model is overloaded
   ```
   解决：这是 Gemini API 暂时过载，请稍后重试

### 调试步骤

1. 验证环境变量：`echo $GEMINI_API_KEY`
2. 检查依赖安装：`pnpm list`
3. 查看详细日志：`DEBUG=true pnpm run demo:computer`

## 📚 进阶使用

### 扩展示例

1. **添加自定义操作**: 修改 `basic-*.ts` 文件添加新的操作逻辑
2. **集成到项目**: 将配置和代码集成到你的项目中
3. **多模型支持**: 修改 `config.ts` 支持其他模型

### 相关文档

- [multimodal/gui-agent 文档](../agent-sdk/README.md)
- [Gemini API 文档](https://ai.google.dev/docs)
- [Agent TARS 文档](../../../README.md)

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来改进这个示例！

## 📄 许可证

Apache-2.0 License