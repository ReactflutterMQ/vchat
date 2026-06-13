<template>
    <div class="conversation-list">
        <div 
            class="item border-gray-300 border-t cursor-pointer p-2"
            :class="{
                'bg-gray-100 hover:bg-gray-300': conversationStore.selectedId === item.id,
                'bg-white hover:bg-gray-200': conversationStore.selectedId !== item.id
            }" 
            v-for="item in items"
            :key="item.id" @click="goToConversation(item.id)"
        >
            <a href="#"><!-- @click.prevent="goToConversation(item.id)" -->
                <div class=" flex justify-between items-center text-sm leading-5 text-gray-500">
                    <span>{{ item.selectedModel }}</span>
                    <span>{{ dayjs(item.updatedAt).format('YYYY-MM-DD') }}</span>
                </div>
                <div class=" flex justify-between align-center">
                    <h2 class=" font-semibold leading-6 text-gray-900 truncate">{{ item.title }}</h2>
                    <AlertDialogRoot v-model:deleteTipVisulable="deleteTipVisulable">
                        <AlertDialogTrigger @click="(event: MouseEvent) => event.stopPropagation()">
                            <Icon icon="material-symbols:delete-forever-rounded" class="text-neutral-300 hover:text-red-500 transition-colors" width="24" /><!-- @click="showDeleteTip" -->
                        </AlertDialogTrigger><!--  @click.stop="showDeleteTip" -->
                        <AlertDialogPortal>
                            <AlertDialogOverlay
                                class="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0 z-30" />
                            <AlertDialogContent
                                class="z-[100] text-[15px] data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                                <AlertDialogTitle class="text-mauve12 m-0 text-[17px] font-semibold">
                                    删除
                                </AlertDialogTitle>
                                <AlertDialogDescription class="text-mauve11 mt-4 mb-5 text-[15px] leading-normal">
                                    删除标题为“{{item.title}}”的对话记录后，数据将无法找回。确认吗？
                                </AlertDialogDescription>
                                <div class="flex justify-end gap-[25px]">
                                    <AlertDialogCancel
                                        class="text-mauve11 bg-mauve4 hover:bg-mauve5 focus:shadow-mauve7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-semibold leading-none outline-none focus:shadow-[0_0_0_2px]">
                                        取消
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                        class="text-red11 bg-red4 hover:bg-red5 focus:shadow-red7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-semibold leading-none outline-none focus:shadow-[0_0_0_2px]"
                                        @click="confirmDelete(item)">
                                        确认
                                    </AlertDialogAction>
                                </div>
                            </AlertDialogContent>
                        </AlertDialogPortal>
                    </AlertDialogRoot>
                </div>
            </a>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import dayjs from 'dayjs';
import { ConversationProps } from '../types';
import { Icon } from '@iconify/vue';
import { useMessage } from '../hooks/useMessage';
import { useConversationStore } from '../stores/conversation';
import {
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogOverlay,
    AlertDialogPortal,
    AlertDialogRoot,
    AlertDialogTitle,
    AlertDialogTrigger,
} from 'radix-vue'
defineProps<{ items: ConversationProps[] }>();
const router = useRouter();
const message = useMessage();
const deleteTipVisulable = ref<Boolean>(false)
const conversationStore = useConversationStore();
const goToConversation = (id: number) => {
    router.push({ path: `/conversation/${id}` })
    conversationStore.selectedId = id;
}
const confirmDelete = async (item: ConversationProps) => {//确认删除这条会话记录
    const { id } = item
    // console.log('---item---', item);
    const res = await conversationStore.deleteConversation(id)
    if (res === undefined) {
        message.success('删除成功！')
    } else {
        message.error('删除失败！')
    }
}
</script>
