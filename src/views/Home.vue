<template>
    <div class="w-[80%] mx-auto h-full">
        <div class="h-[85%] flex items-center">
            <ProviderSelect :items="providers" v-model="selectedModel" />
        </div>
        <div class="h-[15%] flex items-center">
            <!-- Message Input -->
            <MessageInput />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ProviderSelect from '../components/ProviderSelect.vue';
import MessageInput from '../components/MessageInput.vue';
import { ConversationProps, ProviderProps } from '../types';
import { providers } from '../testData';
const selectedModel = ref('');
// const providers: ProviderProps[] = [
//     {
//     id: 1,
//     name: 'qianfan',
//     title: '百度千帆',
//     desc: '文心一言 百度出品的大模型',
//     models: ['ERNIE-4.0-8K', 'ERNIE-3.5-8K', 'ERNIE-Speed-128K'],
//     avatar: 'https://aip-static.cdn.bcebos.com/landing/product/ernie-bote321e5.png',
//     createdAt: '2024-07-03',
//     updatedAt: '2024-07-03'
//   },
//   {
//     id: 2,
//     name: 'dashscope', 
//     title: '阿里灵积',
//     desc: '通义千问',
//     // https://help.aliyun.com/zh/dashscope/developer-reference/api-details?spm=a2c4g.11186623.0.0.5bf41507xgULX5#b148acc634pfc
//     models: ['qwen-turbo', 'qwen-plus', 'qwen-max', 'qwen-vl-plus'],
//     avatar: 'https://qph.cf2.poecdn.net/main-thumb-pb-4160791-200-qlqunomdvkyitpedtghnhsgjlutapgfl.jpeg',
//     createdAt: '2024-07-03',
//     updatedAt: '2024-07-03'
//   },
// ]
</script>