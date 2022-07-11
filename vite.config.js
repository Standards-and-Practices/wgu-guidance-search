import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/wp-content/plugins/wgu-guidance-search/dist/',
  plugins: [vue()]
})
