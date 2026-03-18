<template>
    <div class="h-[10%] bg-gray-200 border-b border-gray-300 flex items-center px-3 justify-between">
        <h3 class="font-semibold text-gray-900">{{ conversation?.title }}</h3>
        <span class="text-sm text-gray-500">{{ dayjs(conversation?.updatedAt).format('YYYY-MM-DD HH:mm:ss') }}</span>
    </div>
    <div class="w-[80%] mx-auto h-[75%] overflow-y-auto pt-2">
        <MessageList :messages="filteredMessages" />
    </div>
    <div class="w-[80%] mx-auto h-[15%] flex items-center">
        <MessageInput />
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { db } from '../db';
import dayjs from 'dayjs';
import MessageInput from '../components/MessageInput.vue';
import MessageList from '../components/MessageList.vue';
import { useConversationStore } from '../stores/conversation';
import { ConversationProps, MessageProps, MessageStatus } from '../types';
const route = useRoute();
const conversationStore = useConversationStore();
const filteredMessages = ref<MessageProps[]>([]);
const conversationId = ref(parseInt(route.params.id as string));
const initMessageId = parseInt(route.query.init as string);
const conversation = computed(() => conversationStore.getConversationById(conversationId.value))
let lastQuestion = ''
const creatingInitialMessage = async () => {
    const createdData: Omit<MessageProps, 'id'> = {
        content: '',
        conversationId: conversationId.value,
        type: 'answer',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: 'loading'
    }
    const newMessageId = await db.messages.add(createdData);
    filteredMessages.value.push({ id: newMessageId, ...createdData })
    if (conversation.value) {
        const provider = await db.providers.where({ id: conversation.value.providerId }).first()
        if (provider) {
            await window.electronAPI.startChat({
                messageId: newMessageId,
                providerName: provider.name,
                selectedModel: conversation.value.selectedModel,
                content: lastQuestion
            })
        }
    }
}
watch(() => route.params.id, async (newId: string) => {
    conversationId.value = parseInt(newId);
    // conversation.value = await db.conversations.where({ id: conversationId.value }).first()
    filteredMessages.value = await db.messages.where({ conversationId: conversationId.value }).toArray()
})
onMounted(async () => {
    // conversation.value = await db.conversations.where({ id: conversationId }).first()
    filteredMessages.value = await db.messages.where({ conversationId: conversationId.value }).toArray()
    if (initMessageId) {
        const lastMessage = await db.messages.where({ conversationId: conversationId.value }).last()
        lastQuestion = lastMessage?.content || ''
        await creatingInitialMessage()
    }
    window.electronAPI.onUpdateMessage(async (streamData) => {
        // console.log('stream', streamData);
        // update database
        // update filteredMessages
        const { messageId, data } = streamData
        const currentMessage = await db.messages.where({ id: messageId }).first()
        if (currentMessage) {
            const updateData = {
                content: currentMessage.content + data.result,
                status: data.is_end ? 'finished' : 'streaming' as MessageStatus,
                updatedAt: dayjs(new Date().toISOString()).format('YYYY-MM-DD HH:mm:ss')
            }
            await db.messages.update(messageId, updateData)
            const index = filteredMessages.value.findIndex(item => item.id === messageId)
            if (index !== -1) {
                filteredMessages.value[index] = { ...filteredMessages.value[index], ...updateData }
            }
        }
    })
})
</script>