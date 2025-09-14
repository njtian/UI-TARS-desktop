/*
 * Copyright (c) 2025 Bytedance, Inc. and its affiliates.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Gemini 2.5 Flash 模型配置
 */
export interface ModelConfig {
  provider: 'gemini';
  id: string;
  geminiApiKey: string;
  baseURL?: string;
  maxTokens?: number;
  temperature?: number;
}

/**
 * 创建 Gemini 2.5 Flash 配置
 */
export function createGeminiConfig(): ModelConfig {
  const geminiApiKey = process.env.GEMINI_API_KEY;

  if (!geminiApiKey) {
    throw new Error('GEMINI_API_KEY environment variable is required');
  }

  return {
    provider: 'gemini',
    id: 'gemini-2.5-flash', // 使用 Gemini 2.5 Flash 的最新版本
    geminiApiKey,
    baseURL: 'https://generativelanguage.googleapis.com/v1beta',
    maxTokens: 8192,
    temperature: 0.1,
  };
}

/**
 * 系统提示词
 */
export const HELLO_WORLD_SYSTEM_PROMPT = `你是一个专业的GUI自动化助手，正在演示如何使用Gemini 2.5 Flash模型进行GUI操作。

你的能力包括：
- 观察和分析屏幕内容
- 执行精确的鼠标点击和键盘输入
- 与用户进行自然语言交互
- 提供操作反馈和状态更新

在这个Hello World示例中，请：
1. 友好地问候用户
2. 简单描述你看到的屏幕内容
3. 执行用户请求的基本操作
4. 提供清晰的操作反馈

请始终保持专业、准确和友好的态度。`;
