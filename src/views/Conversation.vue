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
import { useMessageStore } from '../stores/message';
import { ConversationProps, MessageProps, MessageStatus } from '../types';
const route = useRoute();
const messageStore = useMessageStore();
const conversationStore = useConversationStore();
const filteredMessages = computed(() => messageStore.items)
const conversationId = ref(parseInt(route.params.id as string));
const initMessageId = parseInt(route.query.init as string);
const conversation = computed(() => conversationStore.getConversationById(conversationId.value))
const lastQuestion = computed(() => messageStore.getLastQuestion(conversationId.value))
const creatingInitialMessage = async () => {
    const createdData: Omit<MessageProps, 'id'> = {
        content: '',
        conversationId: conversationId.value,
        type: 'answer',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: 'loading'
    }
    const newMessageId = await messageStore.createMessage(createdData)
    if (conversation.value) {
        const provider = await db.providers.where({ id: conversation.value.providerId }).first()
        if (provider) {
            await window.electronAPI.startChat({
                messageId: newMessageId,
                providerName: provider.name,
                selectedModel: conversation.value.selectedModel,
                content: lastQuestion.value?.content || ''
            })
        }
    }
}
watch(() => route.params.id, async (newId: string) => {
    conversationId.value = parseInt(newId);
    await messageStore.fetchMessagesByConversation(conversationId.value)
})
onMounted(async () => {
    await messageStore.fetchMessagesByConversation(conversationId.value)
    if (initMessageId) {
        await creatingInitialMessage()
    }
    window.electronAPI.onUpdateMessage(async (streamData) => {
        console.log('stream', streamData)
        // update database
        // update filteredMessages
        messageStore.updateMessage(streamData)
    })
})
</script>