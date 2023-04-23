<script setup lang="ts">
import CharaView from './views/chara/index.vue'
import SceneView from './views/scene/index.vue'
import WorldView from './views/worldview/index.vue'

const { id } = defineProps<{
  id: string
}>()
</script>

<template>
  <CharaView v-show="id === 'chara'" />
  <SceneView v-show="id === 'scene'" />
  <WorldView v-show="id === 'worldview'" />
</template>
