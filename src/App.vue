<template>
    <div class=" flex items-center justify-between h-screen">
        <div class=" w-[300px] bg-gray-200 h-full border-r border-gray-300">
            <div class="h-[92%] overflow-y-auto">
                <ConversationList :items="items" v-model="selectedModel" />
            </div>
            <div class="h-[8%] grid grid-cols-2 gap-2 p-2">
                <RouterLink to="/">
                    <button
                        class="shadow-sm inline-flex items-center justify-center bg-green-700 text-white hover:bg-green-700/90 border border-green-700 h-[32px] py-[8px] px-[15px] text-sm rounded-[4px]">
                        <Icon icon="radix-icons:chat-bubble" class="mr-2" />
                        新建聊天
                    </button>
                </RouterLink>
                <RouterLink to="/settings">
                    <button
                        class="shadow-sm inline-flex items-center justify-center bg-green-50 text-green-700 hover:bg-green-700 border border-green-700 hover:text-white h-[32px] py-[8px] px-[15px] text-sm rounded-[4px]">
                        <Icon icon="radix-icons:gear" class="mr-2" />
                        应用设置
                    </button>
                </RouterLink>
            </div>
        </div>
        <div class="h-full flex-1">
            <!-- flex items-center -->
            <!-- <div class="w-[80%] mx-auto h-full">
                <div class="h-[85%] flex items-center">
                    <ProviderSelect :items="providers" v-model="selectedModel" />
                </div>
                <div class="h-[15%] flex items-center">
                    <MessageInput />
                </div>
            </div> -->
            <RouterView />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Icon } from '@iconify/vue'
import { ConversationProps, ProviderProps } from './types';
import ConversationList from './components/ConversationList.vue';
import ProviderSelect from './components/ProviderSelect.vue';
import MessageInput from './components/MessageInput.vue';
const selectedModel = ref('')
const items: ConversationProps[] = [
    { id: 1, selectedModel: 'GPT-3.5-Turbo', title: '什么是光合作用', createdAt: '2026-01-30', updatedAt: '2026-02-02', providerId: 1 },
    { id: 2, selectedModel: 'GPT-4', title: 'Explain quantum computing in simple terms', createdAt: '2026-01-25', updatedAt: '2026-01-28', providerId: 2 },
    { id: 3, selectedModel: 'GPT-3.5-Turbo', title: 'Teach me about JavaScript', createdAt: '2026-01-20', updatedAt: '2026-01-22', providerId: 3 },
    { id: 4, selectedModel: 'GPT-4', title: 'How does machine learning work?', createdAt: '2026-01-15', updatedAt: '2026-01-18', providerId: 4 },
    { id: 5, selectedModel: 'GPT-3.5-Turbo', title: 'Can you write me a short story?', createdAt: '2026-01-10', updatedAt: '2026-01-12', providerId: 5 },
    { id: 6, selectedModel: 'GPT-3.5-Turbo', title: 'Can you write me a short story?', createdAt: '2026-01-10', updatedAt: '2026-01-12', providerId: 6 },
    { id: 7, selectedModel: 'GPT-3.5-Turbo', title: 'Can you write me a short story?', createdAt: '2026-01-10', updatedAt: '2026-01-12', providerId: 7 },
    { id: 8, selectedModel: 'GPT-3.5-Turbo', title: 'Can you write me a short story?', createdAt: '2026-01-10', updatedAt: '2026-01-12', providerId: 8 },
    { id: 9, selectedModel: 'GPT-3.5-Turbo', title: 'Can you write me a short story?', createdAt: '2026-01-10', updatedAt: '2026-01-12', providerId: 9 },
    { id: 10, selectedModel: 'GPT-3.5-Turbo', title: 'Can you write me a short story?', createdAt: '2026-01-10', updatedAt: '2026-01-12', providerId: 10 },
]
const providers: ProviderProps[] = [
    {
    id: 1,
    name: 'qianfan',
    title: '百度千帆',
    desc: '文心一言 百度出品的大模型',
    models: ['ERNIE-4.0-8K', 'ERNIE-3.5-8K', 'ERNIE-Speed-128K'],
    avatar: 'https://aip-static.cdn.bcebos.com/landing/product/ernie-bote321e5.png',
    createdAt: '2024-07-03',
    updatedAt: '2024-07-03'
  },
  {
    id: 2,
    name: 'dashscope', 
    title: '阿里灵积',
    desc: '通义千问',
    // https://help.aliyun.com/zh/dashscope/developer-reference/api-details?spm=a2c4g.11186623.0.0.5bf41507xgULX5#b148acc634pfc
    models: ['qwen-turbo', 'qwen-plus', 'qwen-max', 'qwen-vl-plus'],
    avatar: 'https://qph.cf2.poecdn.net/main-thumb-pb-4160791-200-qlqunomdvkyitpedtghnhsgjlutapgfl.jpeg',
    createdAt: '2024-07-03',
    updatedAt: '2024-07-03'
  },
]
console.log("WChat application loaded successfully!");
</script>