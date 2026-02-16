<template>
    <div class="message-input w-full background-gray-100 border flex gap-10 justify-between shadow-sm focus-within:border-green-700 py-1 px-2 rounded-[4px]">
        <input type="text" class="outline-none flex-1"><!-- rounded-lg -->
        <!-- <Button icon-name="radix-icons:paper-plane" @click="onCreate" :disabled="disabled">
            {{ t('common.send') }}
        </Button> -->
        <Button icon="radix-icons:paper-plane">
            <template #default>
                <span>发送</span>
            </template>
        </Button>
    </div>
</template>

<script setup lang="ts">
import Button from './Button.vue';
</script>