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
    <Body />
  </div>
  <router-view />
</template>
