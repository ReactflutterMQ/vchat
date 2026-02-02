<template>
    <div class=" flex items-center justify-between h-screen">
        <div class=" w-[300px] bg-gray-200 h-full border-r border-gray-300">
            <ConversationList :items="items" />
        </div>
        <div class="h-full flex-1">
            content
        </div>
    </div>
</template>

<script setup lang="ts">
import { ConversationProps } from './types';
import ConversationList from './components/ConversationList.vue';
const items: ConversationProps[] = [
    { id: 1, selectedModel: 'GPT-3.5-Turbo', title: '什么是光合作用', createdAt: '2026-01-30', updatedAt: '2026-02-02', providerId: 1 },
    { id: 2, selectedModel: 'GPT-4', title: 'Explain quantum computing in simple terms', createdAt: '2026-01-25', updatedAt: '2026-01-28', providerId: 2 },
    { id: 3, selectedModel: 'GPT-3.5-Turbo', title: 'Teach me about JavaScript', createdAt: '2026-01-20', updatedAt: '2026-01-22', providerId: 3 },
    { id: 4, selectedModel: 'GPT-4', title: 'How does machine learning work?', createdAt: '2026-01-15', updatedAt: '2026-01-18', providerId: 4 },
    { id: 5, selectedModel: 'GPT-3.5-Turbo', title: 'Can you write me a short story?', createdAt: '2026-01-10', updatedAt: '2026-01-12', providerId: 5 }
]
console.log("WChat application loaded successfully!");
</script>