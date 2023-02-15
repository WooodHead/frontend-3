import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

import { viteMockServe } from 'vite-plugin-mock'

import { vitePluginForArco } from '@arco-plugins/vite-vue'

// https://vitejs.dev/config/
export default defineConfig({
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
