<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import api from '@/api/api'

const { inputValue } = defineProps<{
  inputValue?: string
}>()

const { data, suspense } = $(useQuery({
  enabled: computed(() => inputValue !== undefined && inputValue.length > 0),
  cacheTime: 0,
  queryKey: computed(() => ['character', 'search', 'name', inputValue]),
  queryFn: () => api.scene.searchSceneByName({ text: inputValue! }),
}))

await suspense()
</script>

<template>
  <AOptgroup
    v-if="data?.length ?? 0 > 0"
    :label="`名称中包含 “${inputValue}” 的场景`"
  >
    <AOption
      v-for="scene of data"
      :key="scene.id"
      :value="{ type: 'scene', value: scene }"
      :label="scene.name"
    >
      <CharaItem :id="scene.id" />
    </AOption>
  </AOptgroup>
</template>
