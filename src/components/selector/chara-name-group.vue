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
  queryKey: computed(() => ['chara', 'search', 'name', searchValue]),
  queryFn: () => api.chara.searchByName(searchValue!),
})

await suspense()
</script>

<template>
  <AOptgroup
    v-if="data?.length ?? 0 > 0"
    :label="`名字中包含 “${searchValue}” 的角色`"
  >
    <AOption
      v-for="chara of data"
      :key="chara.id"
      :value="({
        type: 'chara',
        value: chara,
        id: `chara_${chara.id}`,
      } as SelectorOptionValue)"
      :label="chara.name"
    >
      <CharaItem :id="chara.id" />
    </AOption>
  </AOptgroup>
</template>
