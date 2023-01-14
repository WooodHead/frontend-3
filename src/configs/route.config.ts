import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Main',
    component: () => import('@/views/main/index.vue'),
  },
  {
    path: '/project/:id',
    name: 'Workspace',
    component: () => import('@/views/workspace/index.vue'),
    children: [
      {
        path: 'settings',
        name: 'Settings',
        component: () => import('@/views/settings/index.vue'),
      },
      {
        path: 'help',
        name: 'Help',
        component: () => import('@/views/help/index.vue'),
      },
      {
        path: 'about',
        name: 'About',
        component: () => import('@/views/about/index.vue'),
      },
    ],
  },
  {
    path: '/user/:id',
    name: 'User',
    component: () => import('@/views/user/index.vue'),
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import('@/views/test/index.vue'),
  },
  {
    path: '/:catchAll(.*)',
    component: () => import('@/views/not-found.vue'),
  },
]

export default routes
