#!/usr/bin/env tsx
/*
 * Copyright (c) 2025 Bytedance, Inc. and its affiliates.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * GUI Agent Hello World - 桌面操作示例
 *
 * 这个示例演示如何使用 Gemini 2.5 Flash 模型进行桌面 GUI 自动化操作
 */

console.log('🚀 GUI Agent Hello World - 桌面操作示例');
console.log('📝 使用 Gemini 2.5 Flash 模型');
console.log('💻 操作类型: 桌面计算机');
console.log('');

async function main() {
  try {
    console.log('步骤 1: 检查环境变量');
    const geminiApiKey = process.env.GEMINI_API_KEY;
    if (!geminiApiKey) {
      console.error('❌ GEMINI_API_KEY 环境变量未设置');
      return;
    }
    console.log('✅ 环境变量已设置');

    console.log('步骤 2: 导入模块');
    const { createGeminiConfig, HELLO_WORLD_SYSTEM_PROMPT } = await import('./config.js');
    const { SeedGUIAgent } = await import('../../agent-sdk/dist/SeedGUIAgent.js');
    console.log('✅ 模块导入成功');

    console.log('步骤 3: 创建配置');
    const modelConfig = createGeminiConfig();
    console.log('✅ 模型配置创建成功:', modelConfig.id);

    const agentConfig = {
      operatorType: 'computer' as const,
      model: modelConfig,
      systemPrompt: HELLO_WORLD_SYSTEM_PROMPT,
      maxLoopCount: 5,
      uiTarsVersion: 'latest' as const,
    };
    console.log('✅ Agent 配置创建成功');

    console.log('步骤 4: 创建 Agent 实例');
    const agent = new SeedGUIAgent(agentConfig);
    console.log('✅ Agent 实例创建成功');

    console.log('步骤 5: 初始化 Agent');
    await agent.initialize();
    console.log('✅ Agent 初始化成功');

    console.log('步骤 6: 执行任务');
    const response = await agent.run({
      input: [{ type: 'text', text: '你好！请简单描述一下当前桌面。' }],
    });
    console.log('✅ 任务执行完成');

    console.log('📋 执行结果:');
    console.log(response.content);

    console.log('');
    console.log('✅ Hello World 示例执行完成！');
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

main().catch(console.error);
