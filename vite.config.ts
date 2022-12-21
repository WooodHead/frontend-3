import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'

import Vuetify from 'vite-plugin-vuetify'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ArcoResolver, Vuetify3Resolver } from 'unplugin-vue-components/resolvers'

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
    Vuetify({}),
    AutoImport({
      dts: true,
      vueTemplate: true,
      imports: [
        'vue',
        'vue-router',
        '@vueuse/core',
        'pinia',
      ],
      resolvers: [
        ArcoResolver(),
      ],
    }),
    Components({
      dts: true,
      resolvers: [
        Vuetify3Resolver(),
        ArcoResolver({
          sideEffect: true,
        }),
      ],
    }),
  ],
})
