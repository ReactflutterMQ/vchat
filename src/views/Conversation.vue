<template>
    <div class="w-[80%] mx-auto h-[85%] overflow-y-auto pt-2">
        <MessageList :messages="messages" />
    </div>
    <div class="w-[80%] mx-auto h-[15%] flex items-center">
        <MessageInput />
    </div>
</template>

<script setup lang="ts">
import MessageInput from '../components/MessageInput.vue';
import MessageList from '../components/MessageList.vue';
import { MessageProps } from 'src/types';
const messages: MessageProps[] = [
    { id: 1, content: '什么是光合作用', createdAt: '2026-02-15', updatedAt: '2026-02-15', type: 'question', conversationId: 1, status: 'finished' },
    { id: 2, content: '光合作用是植物利用阳光将二氧化碳和水转化为葡萄糖和氧气的过程。', createdAt: '2026-02-15', updatedAt: '2026-02-15', type: 'answer', conversationId: 1, status: 'finished' },
    { id: 3, content: '什么是光合作用', createdAt: '2026-02-15', updatedAt: '2026-02-15', type: 'question', conversationId: 1, status: 'finished' },
    { id: 4, content: '光合作用是植物利用阳光将二氧化碳和水转化为葡萄糖和氧气的过程。', createdAt: '2026-02-15', updatedAt: '2026-02-15', type: 'answer', conversationId: 1, status: 'finished' },
    { id: 5, content: '什么是二氧化碳', createdAt: '2026-02-15', updatedAt: '2026-02-15', type: 'question', conversationId: 1, status: 'finished' },
    { id: 6, content: '', createdAt: '2026-02-15', updatedAt: '2026-02-15', type: 'answer', conversationId: 1, status: 'loading' }
]
</script>