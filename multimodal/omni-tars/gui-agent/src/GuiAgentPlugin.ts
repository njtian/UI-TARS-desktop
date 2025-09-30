/*
 * Copyright (c) 2025 Bytedance, Inc. and its affiliates.
 * SPDX-License-Identifier: Apache-2.0
 */
import { AgentMode, AgentPlugin, COMPUTER_USE_ENVIRONMENT } from '@omni-tars/core';
import { Tool, LLMRequestHookPayload, ChatCompletionContentPart } from '@tarko/agent';
import { ConsoleLogger, createGUIErrorResponse, LogLevel } from '@tarko/shared-utils';
import { Base64ImageParser } from '@agent-infra/media-utils';
import { ImageCompressor, formatBytes } from './utils/ImageCompressor';
import { OperatorManager } from './OperatorManager';
import { sleep } from '@gui-agent/shared/utils';

interface GuiAgentPluginOption {
  operatorManager: OperatorManager;
  agentMode?: AgentMode;
}

const guiLogger = new ConsoleLogger('[O-GUIAgent]', LogLevel.DEBUG);

/**
 * GUI Agent Plugin - handles COMPUTER_USE_ENVIRONMENT for screen interaction
 */
export class GuiAgentPlugin extends AgentPlugin {
  readonly name = 'gui-agent';
  readonly environmentSection = COMPUTER_USE_ENVIRONMENT;
  private agentMode?: AgentMode;
  private operatorManager: OperatorManager;
  private initializedWithMode = false;

  constructor(option: GuiAgentPluginOption) {
    super();
    this.agentMode = option.agentMode;
    this.operatorManager = option.operatorManager;
    if (this.agentMode) {
      guiLogger.info('AgentMode:', JSON.stringify(this.agentMode));
    }
  }

  async initialize(): Promise<void> {
    if (this.agentMode && this.agentMode.id === 'game' && !this.initializedWithMode) {
      await this.emitPresetUserQuey();
      await this.emitScreenshotEvent(4000);
      await this.emitPresetAssistantMessage();
      this.initializedWithMode = true;
    }

    this.agent.registerTool(
      new Tool({
        id: 'browser_vision_control',
        description: 'operator tool',
        parameters: {},
        function: async (input) => {
          try {
            guiLogger.info('browser_vision_control', input);
            const op = await this.operatorManager.getInstance();
            const rawResult = await op?.doExecute({
              rawContent: '',
              rawActionStrings: [],
              actions: input.operator_action,
            });
            if (rawResult?.errorMessage) {
              guiLogger.error('execute error', rawResult?.errorMessage);
              return createGUIErrorResponse(input.action, rawResult?.errorMessage);
            }
            return {
              success: true,
              action: input.action,
              normalizedAction: input.action_for_gui,
              observation: undefined, // Reserved for future implementation
            };
          } catch (error) {
            // Return error response in GUI Agent format
            guiLogger.error(
              'execute error from trycatch',
              error instanceof Error ? error.message : 'Unknown error',
            );
            return createGUIErrorResponse(input.action, error);
          }
        },
      }),
    );
  }

  async onLLMRequest(id: string, payload: LLMRequestHookPayload): Promise<void> {
    // console.log('onLLMRequest', id, payload);
  }

  // async onEachAgentLoopStart(): Promise<void> {
  // }

  // async onEachAgentLoopEnd(): Promise<void> {
  // }

  async onAfterToolCall(
    id: string,
    toolCall: { toolCallId: string; name: string },
    result: unknown,
  ): Promise<void> {
    guiLogger.info('onAfterToolCall toolCall', JSON.stringify(toolCall));

    if (toolCall.name !== 'browser_vision_control') {
      guiLogger.info('onAfterToolCall: skipping screenshot');
      return;
    }

    await this.emitScreenshotEvent();
  }

  private async emitScreenshotEvent(interval = 0): Promise<void> {
    const operator = await this.operatorManager.getInstance();
    if (interval > 0) await sleep(interval);
    const output = await operator?.doScreenshot();
    if (!output?.base64) {
      guiLogger.error('emitScreenshotEvent: Failed to get screenshot');
      return;
    }
    const base64Tool = new Base64ImageParser(output.base64);
    const originalBuffer = Buffer.from(output.base64, 'base64');
    const originalSize = originalBuffer.byteLength;

    // Create image compressor with WebP format and 80% quality
    const compressor = new ImageCompressor({
      quality: 80,
      format: 'webp',
    });
    const compressedBuffer = await compressor.compressToBuffer(originalBuffer);
    const compressedBase64 = `data:image/webp;base64,${compressedBuffer.toString('base64')}`;
    const compressedSize = compressedBuffer.byteLength;
    const compressionRatio = (((originalSize - compressedSize) / originalSize) * 100).toFixed(2);

    guiLogger.debug(`emitScreenshotEvent compression stat: `, {
      originalSize: formatBytes(originalSize),
      compressedSize: formatBytes(compressedSize),
      compressionRatio: `${compressionRatio}% reduction`,
    });

    const content: ChatCompletionContentPart[] = [
      {
        type: 'image_url',
        image_url: {
          url: compressedBase64,
        },
      },
    ];

    if (output?.url) {
      content.push({
        type: 'text',
        text: `The current page's url: ${output.url}`,
      });
    }

    const eventStream = this.agent.getEventStream();
    const events = eventStream.getEvents();
    guiLogger.info('emitScreenshotEvent events length:', events.length);

    const event = eventStream.createEvent('environment_input', {
      description: 'Browser Screenshot',
      content,
      metadata: {
        type: 'screenshot',
        url: output?.url,
      },
    });
    eventStream.sendEvent(event);
  }

  private async emitPresetUserQuey(): Promise<void> {
    const eventStream = this.agent.getEventStream();
    const events = eventStream.getEvents();
    // Only emit if no user messages exist yet
    const hasUserMessage = events.some((event) => event.type === 'user_message');
    if (!hasUserMessage) {
      const event = eventStream.createEvent('user_message', {
        content: `Goto: ${this.agentMode!.link}`,
      });
      eventStream.sendEvent(event);
    }
  }

  private async emitPresetAssistantMessage(): Promise<void> {
    const eventStream = this.agent.getEventStream();
    const events = eventStream.getEvents();
    // Only emit if no assistant messages exist yet
    const hasAssistantMessage = events.some((event) => event.type === 'assistant_message');
    if (!hasAssistantMessage) {
      const event = eventStream.createEvent('assistant_message', {
        content: `Successfully navigated to ${this.agentMode!.link}, page loaded completely.`,
      });
      eventStream.sendEvent(event);
    }
  }
}
