<template>
    <div class="w-[80%] mx-auto h-full">
        <div class="h-[85%] flex items-center">
            <ProviderSelect :items="providers" v-model="currentProvider" />
        </div>
        <div class="h-[15%] flex items-center">
            <!-- Message Input -->
            <MessageInput @create="createConversation" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { db } from '../db';
import { ProviderProps } from '../types';
import { useConversationStore } from '../stores/conversation';
import ProviderSelect from '../components/ProviderSelect.vue';
import MessageInput from '../components/MessageInput.vue';
const router = useRouter();
// const selectedModel = ref('');
const currentProvider = ref('');
const providers = ref<ProviderProps[]>([])
const conversationStore = useConversationStore();
onMounted(async () => {
    providers.value = await db.providers.toArray();
})
const modelInfo = computed(() => {
    const [ provider, selectedModel ] = currentProvider.value.split('/')
    return {
        providerId: parseInt(provider),
        selectedModel
    }
})
const createConversation = async (question: string) => {
    const { providerId, selectedModel } = modelInfo.value
    const currentDate = new Date().toISOString()
    const conversationId = await conversationStore.createConversation({
        title: question,
        providerId,
        selectedModel,
        createdAt: currentDate,
        updatedAt: currentDate
    })
    const newMessageId = await db.messages.add({
        content: question,
        conversationId,
        createdAt: currentDate,
        updatedAt: currentDate,
        type: 'question'
    })
    router.push(`/conversation/${conversationId}?init=${newMessageId}`)
    // * 解决 Date 的格式问题
    // * 解决 Conversation 页面的数据获取
    // * 解决 init 的时候需要添加一条新的信息
}
</script>