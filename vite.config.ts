import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

import { viteMockServe } from 'vite-plugin-mock'

import { vitePluginForArco } from '@arco-plugins/vite-vue'

// https://vitejs.dev/config/
export default defineConfig({
  clearScreen: false,
  server: {
    strictPort: true,
  },
  envPrefix: ['VITE_', 'TAURI_'],
  build: {
    // Tauri uses Chromium on Windows and WebKit on macOS and Linux
    target: process.env.TAURI_PLATFORM === 'windows' ? 'chrome105' : 'safari13',
    // don't minify for debug builds
    minify: !process.env.TAURI_DEBUG ? 'esbuild' : false,
    // 为调试构建生成源代码映射 (sourcemap)
    sourcemap: !!process.env.TAURI_DEBUG,
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  plugins: [
    vue({
      reactivityTransform: true,
    }),
    viteMockServe(),
    vitePluginForArco({
      theme: '@arco-themes/vue-project-chiral',
    }),
    UnoCSS('./uno.config.ts'),
    AutoImport({
      dts: true,
      vueTemplate: true,
      imports: [
        'vue',
        'vue-router',
        '@vueuse/core',
        'pinia',
      ],
      resolvers: [],
    }),
    Components({
      // 组件内部可能有小组件，deep会导致这些内部组件也被注册
      deep: false,
    }),
  ],
})
