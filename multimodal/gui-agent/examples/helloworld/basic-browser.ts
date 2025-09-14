#!/usr/bin/env tsx
/*
 * Copyright (c) 2025 Bytedance, Inc. and its affiliates.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * GUI Agent Hello World - 浏览器操作示例
 *
 * 这个示例演示如何使用 Gemini 2.5 Flash 模型进行浏览器 GUI 自动化操作
 */

import { SeedGUIAgent } from '../../agent-sdk/dist/SeedGUIAgent.js';
import { createGeminiConfig, HELLO_WORLD_SYSTEM_PROMPT } from './config.js';
import type { AgentOptions } from '../../../tarko/agent/dist/index.mjs';

// Define the interface locally since it's not exported from the compiled files
interface GUIAgentConfig extends AgentOptions {
  operatorType: 'browser' | 'computer' | 'android';
  uiTarsVersion?:
    | 'ui-tars-1.0'
    | 'ui-tars-1.5'
    | 'doubao-1.5-ui-tars-15b'
    | 'doubao-1.5-ui-tars-20b'
    | 'latest';
  systemPrompt?: string;
  maxLoopCount?: number;
}

async function main() {
  console.log('🚀 GUI Agent Hello World - 浏览器操作示例');
  console.log('📝 使用 Gemini 2.5 Flash 模型');
  console.log('🌐 操作类型: 浏览器');
  console.log('');

  try {
    // 1. 创建模型配置
    console.log('🔧 正在配置 Gemini 2.5 Flash 模型...');
    const modelConfig = createGeminiConfig();
    console.log(`✅ 模型配置成功: ${modelConfig.id}`);

    // 2. 创建 GUI Agent 配置
    const agentConfig: GUIAgentConfig = {
      operatorType: 'browser', // 浏览器操作
      model: modelConfig,
      systemPrompt: HELLO_WORLD_SYSTEM_PROMPT,
      maxLoopCount: 5, // 浏览器操作可能需要更多步骤
      uiTarsVersion: 'latest',
    };

    // 3. 创建 GUI Agent 实例
    console.log('🤖 正在创建 GUI Agent...');
    const agent = new SeedGUIAgent(agentConfig);

    // 4. 初始化 Agent
    console.log('⚡ 正在初始化 GUI Agent...');
    console.log('🌐 正在启动 Chrome 浏览器...');
    await agent.initialize();
    console.log('✅ GUI Agent 初始化完成');

    // 5. 执行示例任务
    console.log('');
    console.log('🎯 开始执行示例任务...');
    console.log('🔍 任务: 描述当前网页内容并进行简单搜索');

    // 使用简单的网页操作任务作为示例
    const response = await agent.run({
      input: [
        { type: 'text', text: '你好！请描述一下当前网页的内容，然后在搜索框中搜索"GUI Agent"。' },
      ],
    });

    console.log('');
    console.log('📋 执行结果:');
    console.log(response.content);

    console.log('');
    console.log('✅ Hello World 示例执行完成！');
    console.log('🔄 浏览器将保持开启状态，按 Ctrl+C 退出');

    // 保持进程运行，让用户观察浏览器操作结果
    await new Promise((resolve) => {
      process.on('SIGINT', () => {
        console.log('\n👋 正在关闭浏览器...');
        resolve(undefined);
      });
    });
  } catch (error) {
    console.error('❌ 执行过程中发生错误:', error);

    if (error instanceof Error) {
      if (error.message.includes('GEMINI_API_KEY')) {
        console.log('');
        console.log('💡 提示: 请设置 GEMINI_API_KEY 环境变量');
        console.log('   export GEMINI_API_KEY="your-api-key"');
      }
    }

    process.exit(1);
  }
}

// 运行示例
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}
