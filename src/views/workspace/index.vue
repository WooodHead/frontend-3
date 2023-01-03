<script setup lang="ts">
import SideBar from './side-bar/index.vue'
import Body from './body.vue'
import ComponentModal from './components/component-modal.vue'

onMounted(() => {
  const route = useRoute()
  const { id } = route.params
  sessionStorage.setItem('project-id', `${id}`)
})
onUnmounted(() => {
  sessionStorage.removeItem('project-id')
})

const open = $ref(true)
</script>

<template>
  <div row h-full center bg-gray-3>
    <SideBar />
    <Body />
    <ComponentModal v-model="open" />
  </div>
</template>
