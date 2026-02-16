<template>
    <button class="vchat-button flex items-center bg-green-700 text-white border h-[32px] py-[8px] px-[15px] text-sm rounded-[4px] hover:bg-green-700/80">
        <Icon :icon="icon" class="mr-2" />
        <slot></slot>
    </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Icon } from '@iconify/vue';
defineProps<{ icon: string }>()
</script>