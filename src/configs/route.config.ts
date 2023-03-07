import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'main',
    redirect: '/project/1',
    // component: () => import('@/views/main/index.vue'),
  },
  {
    path: '/project/:id',
    name: 'Workspace',
    component: () => import('@/views/workspace/index.vue'),
    children: [
      {
        path: 'settings',
        name: 'ws-settings',
        component: () => import('@/views/workspace/views/settings/index.vue'),
      },
      {
        path: 'help',
        name: 'ws-help',
        component: () => import('@/views/workspace/views/help/index.vue'),
      },
      {
        path: 'about',
        name: 'ws-about',
        component: () => import('@/views/workspace/views/about/index.vue'),
      },
      {
        path: 'user',
        name: 'ws-user',
        component: () => import('@/views/workspace/views/user/index.vue'),
      },
      {
        path: 'search',
        name: 'ws-search',
        component: () => import('@/views/workspace/views/search/index.vue'),
      },
    ],
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('@/views/test/index.vue'),
  },
  {
    path: '/:catchAll(.*)',
    component: () => import('@/views/not-found.vue'),
  },
]

export default createRouter({
  history: createWebHashHistory(),
  routes,
})
