<script setup lang="ts">
import CharacterView from './views/character/index.vue'
import SceneView from './views/scene/index.vue'
import WorldView from './views/worldview/index.vue'
const { id } = defineProps<{
  id: string
}>()
</script>

<template>
  <CharacterView v-show="id === 'character'" />
  <SceneView v-show="id === 'scene'" />
  <WorldView v-show="id === 'worldview'" />
</template>
