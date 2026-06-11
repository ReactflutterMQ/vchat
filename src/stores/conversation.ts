import { defineStore } from "pinia";
import { db } from "../db";
import { ConversationProps } from "../types";

export interface ConversationStore {
    items: ConversationProps[];
}

export const useConversationStore = defineStore('conversation', {
    state: (): ConversationStore => {
        return {
            items: []
        }
    },
    actions: {
        async fetchConversations() {
            const items = await db.conversations.toArray();
            this.items = items;
        },
        async createConversation(createdData: Omit<ConversationProps, 'id'>) {
            const newCId = await db.conversations.add(createdData);
            this.items.push({
                id: newCId,
                ...createdData
            })
            return newCId;
        },
        async deleteConversation(id: number) {//根据id删除对话
            const deletedBack = await db.conversations.delete(id);
            this.fetchConversations();
            return deletedBack;//返回undefined，说明删除成功
        }
    },
    getters: {
        totalNumber: (state) => state.items.length,
        getConversationById: (state) => (id: number) => {
            return state.items.find(item => item.id === id)
        }
    }
})