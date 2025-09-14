/**
 * The following code is modified based on
 * https://github.com/token-js/token.js/blob/main/src/chat/index.ts
 *
 * MIT License
 * Copyright (c) 2024 RPate97
 * https://github.com/token-js/token.js/blob/main/LICENSE
 */

import { ChatCompletionCreateParamsBase } from 'openai/resources/chat/completions';

import { getHandler } from '../handlers/utils.js';
import { models } from '../models.js';
import { CompletionResponse, ConfigOptions, StreamCompletionResponse } from '../userTypes/index.js';

export type OpenAIModel = (typeof models.openai.models)[number];
export type OpenAINonStreamingModel = (typeof models)['openai-non-streaming']['models'][number];
export type AI21Model = (typeof models.ai21.models)[number];
export type AnthropicModel = (typeof models.anthropic.models)[number];
export type GeminiModel = (typeof models.gemini.models)[number];
export type MistralModel = (typeof models.mistral.models)[number];
export type PerplexityModel = (typeof models.perplexity.models)[number];
export type GroqModel = (typeof models.groq.models)[number];
export type OpenRouterModel = string;
export type OpenAICompatibleModel = string;
export type AzureOpenAIModel = string;

export type LLMChatModel =
  | OpenAIModel
  | OpenAINonStreamingModel
  | AI21Model
  | AnthropicModel
  | GeminiModel
  | MistralModel
  | PerplexityModel
  | GroqModel
  | OpenRouterModel
  | OpenAICompatibleModel;

export type LLMProvider = keyof typeof models;

type ProviderModelMap = {
  openai: OpenAIModel;
  'openai-non-streaming': OpenAINonStreamingModel;
  ai21: AI21Model;
  anthropic: AnthropicModel;
  gemini: GeminiModel;
  mistral: MistralModel;
  perplexity: PerplexityModel;
  groq: GroqModel;
  openrouter: OpenRouterModel;
  'openai-compatible': OpenAICompatibleModel;
  'azure-openai': AzureOpenAIModel;
};

type CompletionBase<P extends LLMProvider> = Pick<
  ChatCompletionCreateParamsBase,
  | 'temperature'
  | 'top_p'
  | 'stop'
  | 'n'
  | 'messages'
  | 'max_tokens'
  | 'response_format'
  | 'tools'
  | 'tool_choice'
> & {
  provider: P;
  model: ProviderModelMap[P];
};

export type CompletionStreaming<P extends LLMProvider> = CompletionBase<P> & {
  stream: true;
};

export type CompletionNonStreaming<P extends LLMProvider> = CompletionBase<P> & {
  stream?: false | null;
};

export type ProviderCompletionParams<P extends LLMProvider> =
  | CompletionStreaming<P>
  | CompletionNonStreaming<P>;

export type CompletionParams = {
  [P in LLMProvider]: CompletionStreaming<P> | CompletionNonStreaming<P>;
}[LLMProvider];

export class LLMCompletions {
  private opts: ConfigOptions;

  constructor(opts: ConfigOptions) {
    this.opts = opts;
  }

  create<P extends LLMProvider>(body: CompletionNonStreaming<P>): Promise<CompletionResponse>;
  create<P extends LLMProvider>(body: CompletionStreaming<P>): Promise<StreamCompletionResponse>;
  create<P extends LLMProvider>(
    body: CompletionBase<P>,
  ): Promise<CompletionResponse | StreamCompletionResponse>;
  create(body: CompletionParams): Promise<CompletionResponse | StreamCompletionResponse> {
    // 多API-Key轮询逻辑
    const anySelf = this as any;
    const rawKey = this.opts.apiKey;

    // 初始化检查：如果是多密钥且未初始化
    if (typeof rawKey === 'string' && rawKey.includes(',') && !anySelf.__apiKeys) {
      anySelf.__apiKeys = rawKey
        .split(',')
        .map((k: string) => k.trim())
        .filter(Boolean);
      anySelf.__apiKeyIndex = 0;
      anySelf.__originalApiKey = rawKey; // 保存原始的多密钥字符串
      console.log(
        `[LLMCompletions] 初始化多API-Key轮询，共加载 ${anySelf.__apiKeys.length} 个密钥`,
      );
    }

    // 轮询检查：如果已初始化且有有效密钥
    if (anySelf.__apiKeys && anySelf.__apiKeys.length > 0) {
      const currentKeyIndex = anySelf.__apiKeyIndex;
      const currentKey = anySelf.__apiKeys[currentKeyIndex];
      // secretlint-disable-next-line
      this.opts.apiKey = currentKey;
      anySelf.__apiKeyIndex = (anySelf.__apiKeyIndex + 1) % anySelf.__apiKeys.length;
      console.log(
        `[LLMCompletions] 切换到API-Key [${currentKeyIndex + 1}/${anySelf.__apiKeys.length}]: ${currentKey.substring(0, 8)}...`,
      );
    }

    const handler = getHandler(body.provider, this.opts);
    return handler.create(body);
  }
}

export class LLMChat {
  completions: LLMCompletions;

  constructor(opts: ConfigOptions) {
    this.completions = new LLMCompletions(opts);
  }
}
