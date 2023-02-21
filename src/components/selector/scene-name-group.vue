<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { SelectorOptionValue } from './value'
import api from '@/api/api'

const { searchValue } = defineProps<{
  searchValue?: string
}>()

const { data, suspense } = useQuery({
  enabled: computed(() => searchValue !== undefined && searchValue.length > 0),
  cacheTime: 0,
  queryKey: computed(() => ['scene', 'search', 'name', searchValue]),
  queryFn: () => api.scene.searchByName({ text: searchValue! }),
})

await suspense()
</script>

<template>
  <AOptgroup
    v-if="data?.length ?? 0 > 0"
    :label="`名称中包含 “${searchValue}” 的场景`"
  >
    <AOption
      v-for="scene of data"
      :key="scene.id"
      :value="({
        type: 'scene',
        value: scene,
        id: `scene_${scene.id}`,
      } as SelectorOptionValue) "
      :label="scene.name"
    >
      <CharaItem :id="scene.id" />
    </AOption>
  </AOptgroup>
</template>
