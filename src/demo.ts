import { ChatCompletion } from '@baiducloud/qianfan';
import OpenAI from 'openai';
import path from 'path';
import fs from 'fs';
import { readFile } from 'fs/promises'
import 'dotenv/config';

const client = new OpenAI({
    apiKey: process.env.ALI_API_KEY,
    baseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1'
})
export async function run1() {
    const client = new ChatCompletion()
    const stream = await client.chat({
        messages: [
            // { role: 'user', content: '什么是光合作用？' },
            { "role": "user", "content": "你好" },
            { "role": "assistant", "content": "你好，有什么我可以帮助你的吗？" },
            { "role": "user", "content": "我在上海，周末可以去哪里玩？" },
            { "role": "assistant", "content": "上海有很多好玩的地方，比如外滩、城隍庙、豫园等等。" },
            { "role": "user", "content": "周末这里的天气怎么样？" }
        ],
        stream: true,
    }, 'ERNIE-Speed-Pro-128K')//ERNIE-Speed-128K ERNIE-3.5-128K ERNIE-Speed-Pro-128K qianfan-sug-8k

    for await (const chunk of stream) {
        console.log(chunk);
    }
}

// 使用阿里通义千问
export async function run2() {
    const stream = await client.chat.completions.create({
        messages: [
            { role: 'system', content: '你现在是一只卡通片里面的可爱小狗，请模仿汪汪队长的口吻进行回答' },
            { role: 'user', content: '请问队长，老鼠为什么有害呢？' }
        ],
        model: 'qwen-turbo',
        stream: true
    })
    for await (const chunk of stream) {
        console.log(chunk.choices[0].delta)
    }
}

// 使用阿里通义千问 qwen-vl 识别图片
export async function run3() {
    const imageBuffer = await readFile('c:/Users/LEGION/Desktop/1.jpg');
    const base64Image = imageBuffer.toString('base64');
    const resp = await client.chat.completions.create({
        messages: [{
            role: 'user',
            content: [
                { type: 'text', text: '图中是什么动物？' },
                { type: 'text', text: '如果是动漫人物,你知道它来自于哪个动漫吗？' },
                { type: 'image_url', image_url: { url: `data:image/png;base64,${base64Image}` } }
            ]
        }],
        model: 'qwen-vl-plus'
    })
    console.log('resp', resp);
}

// 使用通义千问 qwen-long 分析文件
export async function run4() {
    const fileObj = await client.files.create({ file: fs.createReadStream('c:/Users/LEGION/Desktop/前端开发机试考核题.pdf'), purpose: 'file-extract' as any })
    console.log('resp', fileObj);
    const resp = await client.chat.completions.create({
        messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'system', content: `fileid://${fileObj.id}` },
            { role: 'user', content: '请帮忙概括文件讲述了什么' },
            { role: 'user', content: '这道题的难度怎么样' },
        ],
        model: 'qwen-long'
    })
    console.log('resp', resp);
}
