import { defineStore } from "pinia";
import { db } from "../db"
import dayjs from "dayjs";
import { MessageProps, UpdatedStreamData, MessageStatus } from "../types";

export interface MessageStore {
    items: MessageProps[]
}

export const useMessageStore = defineStore('message', {
    state: (): MessageStore => {
        return {
            items: []
        }
    },
    actions: {
        async fetchMessagesByConversation(conversationId: number) {
            const items = await db.messages.where({ conversationId }).toArray()
            this.items = items
        },
        async createMessage(createData: Omit<MessageProps, 'id'>) {
            const newMessageId = await db.messages.add(createData)
            this.items.push({ id: newMessageId, ...createData })
            return newMessageId
        },
        async updateMessage(streamData: UpdatedStreamData) {
            const { messageId, data } = streamData
            const currentMessage = await db.messages.where({ id: messageId }).first()
            if (currentMessage) {
                const updateData = {
                    content: currentMessage.content + data.result,
                    status: data.is_end ? 'finished' : 'streaming' as MessageStatus,
                    updatedAt: dayjs(new Date().toISOString()).format('YYYY-MM-DD HH:mm:ss')
                }
                await db.messages.update(messageId, updateData)
                const index = this.items.findIndex(item => item.id === messageId)
                if (index !== -1) {
                    this.items[index] = { ...this.items[index], ...updateData }
                }
            }
        }
    },
    getters: {
        getLastQuestion: (state) => (conversationId: number) => {
            return state.items.findLast(item => item.conversationId === conversationId && item.type === 'question')
        }
    }
})