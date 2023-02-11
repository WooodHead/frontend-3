<script setup lang="ts">
import SideBar from './side-bar/index.vue'
import Body from './body.vue'

onMounted(() => {
  const route = useRoute()
  const { id } = route.params
  sessionStorage.setItem('project-id', `${id}`)
})
onUnmounted(() => {
  sessionStorage.removeItem('project-id')
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
