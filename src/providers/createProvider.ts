import { BaseProvider } from "./BaseProvider";
import { QianfanProvider } from "./QianfanProvider";
import { OpenAIProvider } from "./OpenAIProvider";
import { configManager } from "../config";

export function createProvider(providerName: string): BaseProvider {
    const config = configManager.get();
    const providerConfig = config.providerConfigs[providerName] || {};
    switch (providerName) {
        case "qianfan":
            if (!providerConfig.accessKey || !providerConfig.secretKey) {
                throw new Error('缺少千帆API配置：请在设置中配置 accessKey 和 secretKey')
            } else if (providerConfig.accessKey !== process.env.QIANFAN_ACCESS_KEY || providerConfig.secretKey !== process.env.QIANFAN_SECRET_KEY) {
                throw new Error('千帆API配置错误！请检查accessKey 和 secretKey是否配置正确！')
            }
            return new QianfanProvider(providerConfig.accessKey, providerConfig.secretKey);
        case "dashscope":
            if (!providerConfig.apiKey || !providerConfig.baseUrl) {
                throw new Error('缺少通义千问API配置：请在设置中配置 apiKey 和 baseUrl')
            } else if (providerConfig.apiKey !== process.env.ALI_API_KEY || providerConfig.baseUrl !== process.env.ALI_BASE_URL) {
                throw new Error('通义千问API配置错误！请检查apiKey 和 baseUrl是否配置正确！')
            }
            return new OpenAIProvider(providerConfig.apiKey, providerConfig.baseUrl);
        case "deepseek":
            if (!providerConfig.apiKey || !providerConfig.baseUrl) {
                throw new Error('缺少DeepSeek API配置：请在设置中配置 apiKey 和 baseUrl')
            } else if (providerConfig.apiKey !== process.env.DEEPSEEK_API_KEY || providerConfig.baseUrl !== process.env.DEEPSEEK_BASE_URL) {
                throw new Error('DeepSeek API配置错误！请检查apiKey 和 baseUrl是否配置正确！')
            }
            return new OpenAIProvider(providerConfig.apiKey, providerConfig.baseUrl);
        default:
            throw new Error(`Unsupported provider: ${providerName}`)
    }
}