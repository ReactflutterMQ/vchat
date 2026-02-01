import { defineConfig } from 'vite';
import { createRequire } from 'node:module';
// import tailwindcss from '@tailwindcss/vite'
const require = createRequire(import.meta.url);
const vue = require('@vitejs/plugin-vue');
// import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config
export default defineConfig({
    plugins: [vue()],
});
