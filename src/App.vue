<template>
    <div class=" flex items-center justify-between h-screen">
        <div class=" w-[300px] bg-gray-200 h-full border-r border-gray-300">
            <div class="h-[92%] overflow-y-auto">
                <ConversationList :items="conversations" v-model="selectedModel" />
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
            <Button color="purple" icon="radix-icons:gear" plain :loading="loading" @click="loading = !loading">Hello there</Button>
            <RouterView />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Icon } from '@iconify/vue'
import Button from './components/Button.vue';
import ConversationList from './components/ConversationList.vue';
import { conversations } from './testData';
const selectedModel = ref('')
const loading = ref(false)
console.log("WChat application loaded successfully!");
</script>