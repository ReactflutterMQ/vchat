import OpenAI from 'openai';
import { BaseProvider } from './BaseProvider';
import { ChatMessageProps, UniversalChunkProps } from '../types';
import { convertMessages } from '../helper';

/**
 * OpenAIProvider 类，继承自 BaseProvider，用于与 OpenAI API 进行交互
 * 提供了基于 OpenAI 的聊天功能实现
 */
export class OpenAIProvider extends BaseProvider {
    // 声明一个私有的 client 属性，用于存储 OpenAI 客户端实例
    private client: any;
    /**
     * 构造函数，初始化 OpenAI 客户端
     * @param apiKey - OpenAI API 密钥
     * @param baseURL - OpenAI API 的基础 URL
     */
    constructor(apiKey: string, baseURL: string) {
        super(); // 调用父类构造函数
        this.client = new OpenAI({ apiKey, baseURL }); // 初始化 OpenAI 客户端
    }
    async chat(messages: ChatMessageProps[], model: string) {
        const convertedMessages = await convertMessages(messages);
        const stream = await this.client.chat.completions.create({
            model,
            messages: convertedMessages as any,
            // messages: messages as any,
            stream: true
        })
        const self = this;
        return {
            async *[Symbol.asyncIterator]() {
                for await (const chunk of stream) {
                    yield self.transformResponse(chunk);
                }
            }
        }
    }
    protected transformResponse(chunk: OpenAI.Chat.Completions.ChatCompletionChunk): UniversalChunkProps {
        const choice = chunk.choices[0];
        return {
            is_end: choice?.finish_reason === 'stop',
            result: choice?.delta?.content || ''
        }
    }
}