<template>
    <div
        class="message-input w-full background-gray-100 border gap-10 justify-between shadow-sm focus-within:border-green-700 py-1 px-2 rounded-[4px]">
        <div v-if="imagePreview" class="mb-2 relative flex items-center">
            <img :src="imagePreview" alt="Preview" class="h-24 w-24 object-cover rounded" />
        </div>
        <div class="flex items-center">
            <input type="file" class="hidden" ref="fileInput" accept="image/*" :disabled="disabled"
                @change="handleImageUpload">
            <Icon icon="radix-icons:image" width="24" height="24" :class="[
                'mr-2',
                disabled ? 'text-gray-300 cursor-not-allowed' : 'text-gray-400 cursor-pointer hover:text-gray-600'
            ]" @click="triggerFileInput" />
            <input type="text" class="outline-none flex-1" v-model="model" @keyup.enter="onCreate" :disabled="disabled">
            <Button icon="radix-icons:paper-plane" @click="onCreate" :disabled="disabled">
                <template #default>
                    <span>发送</span>
                </template>
            </Button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Button from './Button.vue';
import { Icon } from '@iconify/vue';
defineProps<{
    disabled?: boolean
}>()
const fileInput = ref<HTMLInputElement | null>(null)
const imagePreview = ref<string>('')
const emit = defineEmits<{
    create: [value: string, imagePath?: string]
}>()
const model = defineModel<string>()
const onCreate = () => {
    if (model.value && model.value.trim() !== '') {
        if (selectedImage) {
            const filePath = window.electronAPI.getFilePath(selectedImage)
            console.log('filePath', filePath);
            emit('create', model.value, filePath)
        } else {
            emit('create', model.value)
        }
        selectedImage = null
        imagePreview.value = ''
        // emit('create', model.value, selectedImage?.path || undefined)
    }
}
const triggerFileInput = () => {
    fileInput.value?.click()
}
let selectedImage: File | null = null;
const handleImageUpload = (event: Event) => {
    // console.log('--event--', event);
    const target = event.target as HTMLInputElement
    if (target.files && target.files.length) {
        console.log('target.files', target.files[0]);
        selectedImage = target.files[0]
        const reader = new FileReader()
        reader.onload = (e) => {
            imagePreview.value = e.target?.result as string
        }
        reader.readAsDataURL(selectedImage)
    }
}
</script>