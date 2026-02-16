<template>
    <div class="provider-select w-full">
        <SelectRoot v-model="currentModel">
            <SelectTrigger
                class="flex w-full items-center justify-between rounded-md py-1.5 px-3 shadow-sm border outline-none data-[placeholder]:text-gray-400">
                <SelectValue placeholder="Select a model..." />
                <Icon icon="radix-icons:chevron-down" class="h-5 w-5" />
            </SelectTrigger>
            <SelectPortal>
                <SelectContent class="bg-white rounded-md shadow-md z-[100] border">
                    <SelectViewport class="p-2">
                        <div v-for="(provider, index) in items">
                            <SelectLabel class="flex items-center px-6 h-7 text-gray-500">
                                <img :src="provider.avatar" :alt="provider.name" class="h-5 w-5 mr-2 rounded" />
                                {{ provider.name }}
                            </SelectLabel>
                            <SelectGroup>
                                <SelectItem
                                    class="outline-none rounded flex items-center h-7 px-6 text-green-700 cursor-pointer data-[highlighted]:bg-green-700 data-[highlighted]:text-white"
                                    v-for="(model, e) in provider.models" :key="e" :value="`${provider.id}/${model}`">
                                    <SelectItemIndicator class=" absolute left-2 w-6">
                                        <Icon icon="radix-icons:check" />
                                    </SelectItemIndicator>
                                    <SelectItemText>{{ model }}</SelectItemText>
                                </SelectItem>
                            </SelectGroup>
                            <SelectSeparator v-if="index < items.length-1" class="h-[1px] my-2 bg-gray-300" />
                        </div>
                    </SelectViewport>
                    <SelectScrollDownButton />
                    <SelectArrow />
                </SelectContent>
            </SelectPortal>
        </SelectRoot>
    </div>
</template>

<script setup lang="ts">
import {
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectItemIndicator,
    SelectItemText,
    SelectLabel,
    SelectPortal,
    SelectRoot,
    SelectScrollDownButton,
    SelectScrollUpButton,
    SelectSeparator,
    SelectTrigger,
    SelectValue,
    SelectViewport,
} from 'radix-vue';
import { Icon } from '@iconify/vue'
import { ProviderProps } from '../types';
defineProps<{ items: ProviderProps[] }>()
const currentModel = defineModel<string>()
</script>
