<script setup lang="ts">
import CharacterView from './views/character/index.vue'
import SceneView from './views/scene/index.vue'
import WorldView from './views/worldview/index.vue'
const { id } = defineProps<{
  id: string
}>()
</script>

<template>
  <CharacterView v-if="id === 'character'" />
  <SceneView v-else-if="id === 'scene'" />
  <WorldView v-else-if="id === 'worldview'" />
</template>
