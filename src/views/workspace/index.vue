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
  <div row h-full center bg-gray-3>
    <SideBar />
    <Suspense>
      <Body />
      <template #fallback>
        <div fullscreen grow center>
          <Status card w-1-2 h-1-2 loading />
        </div>
      </template>
    </Suspense>
  </div>
  <RouterView />
</template>
