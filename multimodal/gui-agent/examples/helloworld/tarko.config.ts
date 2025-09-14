/*
 * Copyright (c) 2025 Bytedance, Inc. and its affiliates.
 * SPDX-License-Identifier: Apache-2.0
 */
import { defineConfig } from '../../../tarko/agent-cli/dist/index.js';

/**
 * GUI Agent Hello World 配置
 * 使用 Gemini 2.5 Flash 模型的最小化配置示例
 */
export default defineConfig({
  // 操作类型：computer（桌面）或 browser（浏览器）
  operatorType: 'computer',

  // Gemini 2.5 Flash 模型配置
  model: {
    provider: 'gemini',
    id: 'gemini-2.5-flash',
    geminiApiKey: process.env.GEMINI_API_KEY, // 从环境变量读取 API Key
    baseURL: 'https://generativelanguage.googleapis.com/v1beta',
    maxTokens: 8192,
    temperature: 0.1,
  },

  // UI-TARS 版本
  uiTarsVersion: 'latest',

  // 系统提示词
  systemPrompt: `你是一个GUI自动化助手，使用Gemini 2.5 Flash模型。

你的能力：
- 观察和分析屏幕内容
- 执行精确的GUI操作
- 与用户自然语言交互

请友好地与用户交互，准确执行操作，并提供清晰的反馈。`,

  // 最大循环次数
  maxIterations: 3,

  // 快照配置
  snapshot: {
    enable: true,
    storageDirectory: './snapshots',
  },

  // Web UI 配置
  webui: {
    title: 'GUI Agent Hello World',
    subtitle: 'Powered by Gemini 2.5 Flash',
    welcomeTitle: 'Hello World GUI Agent',
    welcomePrompts: [
      '你好，请描述当前屏幕内容',
      '帮我截个图并分析界面',
      '打开记事本并输入Hello World',
      '在桌面右键打开菜单',
      '切换到其他应用程序',
    ],
  },
});
