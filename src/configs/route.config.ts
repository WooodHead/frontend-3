import type { RouteRecordRaw } from 'vue-router'
import Main from '@/views/main.vue'
import Workspace from '@/views/workspace/index.vue'
import Test from '@/views/test/index.vue'
import NotFound from '@/views/not-found.vue'
import Settings from '@/views/settings/index.vue'
import Help from '@/views/help/index.vue'
import About from '@/views/about/index.vue'
import User from '@/views/user/index.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Main',
    component: Main,
  },
  {
    path: '/project/:id',
    name: 'Workspace',
    component: Workspace,
    children: [
      {
        path: 'settings',
        name: 'Settings',
        component: Settings,
      },
      {
        path: 'help',
        name: 'Help',
        component: Help,
      },
      {
        path: 'about',
        name: 'About',
        component: About,
      },
    ],
  },
  {
    path: '/user/:id',
    name: 'User',
    component: User,
  },
  {
    path: '/test',
    name: 'Test',
    component: Test,
  },
  {
    path: '/:catchAll(.*)',
    component: NotFound,
  },
]

export default routes
