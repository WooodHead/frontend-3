<script setup lang="ts">
import { useQueryClient } from '@tanstack/vue-query'
import SideBar from './side-bar/index.vue'
import Body from './body.vue'
import api from '@/api/api'

onMounted(() => {
  const route = useRoute()
  const { id } = route.params
  sessionStorage.setItem('project-id', `${id}`)
})
onUnmounted(() => {
  sessionStorage.removeItem('project-id')
})

const router = useRouter()
const { Ctrl_P } = useMagicKeys({ passive: false })
whenever(Ctrl_P, () => {
  router.push({ name: 'ws-search' })
})

const client = useQueryClient()
client.prefetchQuery({
  queryKey: ['ai', 'query'],
  queryFn: () =>
    Promise.all(
      Array(3)
        .fill(0)
        .map(() => api.ai.generateQuery())
    ),
})
</script>

<template>
  <Suspense>
    <div row h-full center bg-gray-3>
      <SideBar />
      <Body />
    </div>
    <template #fallback>
      <div center grow fullscreen bg-gray-3>
        <Status card w-1-2 h-1-2 loading />
      </div>
    </template>
  </Suspense>
  <RouterView />
</template>
