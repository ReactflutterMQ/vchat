<script setup lang="ts">
import { ToastProvider, ToastViewport } from 'radix-vue'
import MessageItem from './MessageItem.vue'
import { messageStore } from '../../hooks/messageStore'

// messageStore.toasts = reactive([{id, type, message, duration}])
</script>

<template>
  <ToastProvider>
    <ToastViewport class="fixed top-4 left-1/2 -translate-x-1/2 z-[9999] flex flex-col gap-2">
      <MessageItem
        v-for="t in messageStore.toasts"
        :key="t.id"
        :type="t.type"
        :message="t.message"
        :duration="t.duration"
        @destroy="messageStore.removeToast(t.id)"
      />
    </ToastViewport>
  </ToastProvider>
</template>