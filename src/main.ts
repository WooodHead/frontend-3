import { createApp } from 'vue'

import { VueQueryPlugin } from '@tanstack/vue-query'
import { createPinia } from 'pinia'

import { createRouter, createWebHashHistory } from 'vue-router'
import Vuetify from './configs/vuetify.config'
import queryConfig from './configs/query.config'
import routes from './configs/route.config'

import App from './App.vue'

import './main.css'
import '@unocss/reset/tailwind.css'
import 'uno.css'
import 'vuetify/styles'

const app = createApp(App)
  .use(VueQueryPlugin, { queryClientConfig: queryConfig })
  .use(Vuetify)
  .use(createPinia())
  .use(createRouter({
    history: createWebHashHistory(),
    routes,
  }))

app.mount('#app')
