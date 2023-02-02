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
  queryFn: () => api.character.searchCharacterByName({ text: inputValue! }),
}))

await suspense()
</script>

<template>
  <AOptgroup
    v-if="data?.length ?? 0 > 0"
    :label="`名字中包含 “${inputValue}” 的角色`"
  >
    <AOption
      v-for="chara of data"
      :key="chara.id"
      :value="{ type: 'character', value: chara }"
      :label="chara.name"
    >
      <CharaItem :id="chara.id" />
    </AOption>
  </AOptgroup>
</template>
