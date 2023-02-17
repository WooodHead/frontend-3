import { createApp } from 'vue'

import { VueQueryPlugin } from '@tanstack/vue-query'
import { createPinia } from 'pinia'
import ArcoVue from '@arco-design/web-vue'

import queryClientConfig from './configs/query.config'
import router from './configs/route.config'

import '@unocss/reset/tailwind.css'
import './main.css'
import '@arco-design/web-vue/dist/arco.css'
import '@vue-flow/core/dist/style.css'
import '@vue-flow/core/dist/theme-default.css'
import 'uno.css'

import App from './App.vue'
import { ClickOutside } from './utils/click-outside'

const app = createApp(App)
  .use(VueQueryPlugin, { queryClientConfig })
  .use(createPinia())
  .use(router)
  .use(ArcoVue)

app.directive('click-outside', ClickOutside)

app.mount('#app')
