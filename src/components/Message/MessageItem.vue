<script setup lang="ts">
import {
  ToastRoot,
  ToastTitle,
  ToastClose,
} from 'radix-vue'

const props = defineProps<{
  type: 'success' | 'warning' | 'error' | 'info'
  message: string
  duration?: number
}>()
</script>

<template>
  <ToastRoot
    :duration="props.duration ?? 3000"
    class="flex items-center gap-2 px-4 py-2 rounded shadow bg-white border"
    :class="{
      'border-green-500 text-green-600': type === 'success',
      'border-yellow-500 text-yellow-600': type === 'warning',
      'border-red-500 text-red-600': type === 'error',
      'border-blue-500 text-blue-600': type === 'info',
    }"
  >
    <!-- icon -->
    <span class="text-lg">
      <span v-if="type === 'success'">✔</span>
      <span v-else-if="type === 'warning'">⚠</span>
      <span v-else-if="type === 'error'">✖</span>
      <span v-else>ℹ</span>
    </span>

    <ToastTitle class="text-sm font-medium">
      {{ message }}
    </ToastTitle>

    <ToastClose class="ml-2 text-gray-400 hover:text-gray-700">
      ✕
    </ToastClose>
  </ToastRoot>
</template>