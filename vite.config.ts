import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'

import Vuetify from 'vite-plugin-vuetify'

import AutoImport from 'unplugin-auto-import/vite'

import Components from 'unplugin-vue-components/vite'
import { Vuetify3Resolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  plugins: [
    UnoCSS('./uno.config.ts'),
    vue({
      reactivityTransform: true,
    }),
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
    }),
    Components({
      dts: true,
      resolvers: [
        Vuetify3Resolver(),
      ],
    }),
  ],
})
