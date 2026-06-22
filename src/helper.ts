import fs from 'fs/promises';
import { lookup } from 'mime-types';
/**
 * 将消息数组转换为特定格式
 * @param messages - 包含角色、内容和可选图片路径的消息数组
 * @returns 转换后的消息数组
 */
export async function convertMessages( messages: { role: string, content: string, imagePath?: string }[] ) {
    const convertedMessages = [] // 存储转换后的消息
    for (const message of messages) { // 遍历每条消息
        let convertedContent: string | any[] // 转换后的内容，可以是字符串或数组
        if (message.imagePath) { // 如果消息包含图片路径
            const imageBuffer = await fs.readFile(message.imagePath) // 读取图片文件
            const base64Image = imageBuffer.toString('base64') // 将图片转换为Base64字符串
            const mimeType = lookup(message.imagePath)
            convertedContent = [
                {
                    type: 'text',
                    text: message.content
                },
                {
                    type: 'image_url',
                    image_url: {
                        url: `data:${mimeType};base64,${base64Image}`
                    }
                }
            ]
        } else {
            convertedContent = message.content // 如果消息不包含图片路径，则直接使用内容
        }
        const { imagePath, ...messageWithoutImagePath } = message
        convertedMessages.push({
            ...messageWithoutImagePath,
            content: convertedContent
        })
    }
    return convertedMessages
}