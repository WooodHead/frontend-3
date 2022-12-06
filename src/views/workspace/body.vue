<script setup lang="ts">
import WSComponent from './components/index.vue'
import useWSStore from './store'

const WSStore = useWSStore()

onMounted(() => {
  WSStore.insertComponent('editor', 'left')
  WSStore.insertComponent('gantt', 'right')
})
</script>

<template>
  <div
    grow relative
    h-screen
    bg="gray-200 dark:gray-500"
    grid="~ cols-2 rows-2"
    gap-4 p-4
  >
    <WSComponent
      v-for="{ id, position, state } in WSStore.components"
      :id="id"
      :key="id"
      :position="position"
      :state="state"
    />
  </div>
</template>
