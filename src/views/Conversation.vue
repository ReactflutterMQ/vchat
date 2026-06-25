<template>
    <div class="h-[10%] bg-gray-200 border-b border-gray-300 flex items-center px-3 justify-between">
        <h3 class="font-semibold text-gray-900">{{ conversation?.title }}</h3>
        <span class="text-sm text-gray-500">{{ dayjs(conversation?.updatedAt).format('YYYY-MM-DD HH:mm:ss') }}</span>
    </div>
    <div class="w-[80%] mx-auto h-[75%] overflow-y-auto pt-2">
        <MessageList :messages="filteredMessages" ref="messageListRef" />
    </div>
    <div class="w-[80%] mx-auto h-[15%] flex items-center">
        <MessageInput @create="sendNewMessage" v-model="inputValue" :disabled="messageStore.isMessageLoading" />
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import { db } from '../db';
import dayjs from 'dayjs';
import MessageInput from '../components/MessageInput.vue';
import MessageList from '../components/MessageList.vue';
import { useConversationStore } from '../stores/conversation';
import { useMessageStore } from '../stores/message';
import { MessageProps, MessageListInstance, MessageStatus } from '../types';
const route = useRoute();
const inputValue = ref('');
const messageStore = useMessageStore();
const conversationStore = useConversationStore();
const messageListRef = ref<MessageListInstance>();
const filteredMessages = computed(() => messageStore.items)
const sendMessages = computed(() => filteredMessages.value
    .filter(messages => messages.status !== 'loading' && messages.status !== 'error')
    .map(messages => {
        return {
            role: messages.type
             === 'question' ? 'user' : 'assistant',
            content: messages.content,
            ...(messages.imagePath && { imagePath: messages.imagePath })
        }
    })
)
const conversationId = ref(parseInt(route.params.id as string));
const initMessageId = parseInt(route.query.init as string);
const conversation = computed(() => conversationStore.getConversationById(conversationId.value))
const lastQuestion = computed(() => messageStore.getLastQuestion(conversationId.value))
const sendNewMessage = async (question: string, imagePath?: string) => {
    if (question) {
        let copiedImagePath: string | undefined
        if (imagePath) {
            try {
                copiedImagePath = await window.electronAPI.copyImageToUserDir(imagePath)
                console.log('copiedImagePath:', copiedImagePath);
            } catch (error) {
                console.error('Failed to copy image:', error)
            }
        }
        const date = new Date().toISOString()
        await messageStore.createMessage({
            content: question,
            conversationId: conversationId.value,
            createdAt: date,
            updatedAt: date,
            type: 'question',
            ...(copiedImagePath && { imagePath: copiedImagePath })
        })
        inputValue.value = ''
        creatingInitialMessage()
    }
}
const messageScrollToBottom = async () => {
    await nextTick()
    if (messageListRef.value) {
        messageListRef.value.ref.scrollIntoView({ block: 'end', behavior: 'smooth'})
    }
}
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
    await messageScrollToBottom()
    if (conversation.value) {
        const provider = await db.providers.where({ id: conversation.value.providerId }).first()
        if (provider) {
            await window.electronAPI.startChat({
                messageId: newMessageId,
                providerName: provider.name,
                selectedModel: conversation.value.selectedModel,
                // content: lastQuestion.value?.content || ''
                messages: sendMessages.value
            })
        }
    }
}
watch(() => route.params.id, async (newId: string | string[]) => {
    const id = Array.isArray(newId) ? newId[0] : newId
    conversationId.value = parseInt(id)
    await messageStore.fetchMessagesByConversation(conversationId.value)
    await messageScrollToBottom()
})
onMounted(async () => {
    await messageStore.fetchMessagesByConversation(conversationId.value)
    await messageScrollToBottom()
    if (initMessageId) {
        await creatingInitialMessage()
    }
    let currentMessageListHeight = 0
    let streamContent = ''
    const checkAndScrollToBottom = async () => {
        const newHeight = messageListRef.value?.ref.clientHeight || 0
        // console.log('the newHeight', newHeight);
        // console.log('the currentMessageListHeight', currentMessageListHeight);
        if (newHeight > currentMessageListHeight) {
            // console.log('scroll to bottom');
            currentMessageListHeight = newHeight
            await messageScrollToBottom()
        }
    }
    window.electronAPI.onUpdateMessage(async (streamData) => {
        console.log('stream', streamData)
        const { messageId, data } = streamData
        streamContent += data.result
        const getMessageStatus = (data: any): MessageStatus => {
            if (data.is_error) {
                return 'error'
            } else if (data.is_end) {
                return 'finished'
            } else {
                return 'streaming'
            }
        }
        const updateData = {
            content: streamContent,
            status: getMessageStatus(data),
            updatedAt: dayjs(new Date().toISOString()).format('YYYY-MM-DD HH:mm:ss')
        }
        // update database
        // update filteredMessages
        await messageStore.updateMessage(messageId, updateData)
        await nextTick()
        checkAndScrollToBottom()
        if (data.is_end) {
            streamContent = ''
        }
    })
})
</script>