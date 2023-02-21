<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import Basic from './index.vue'
import { UnitIDRange } from '@/utils/unit-id'
import api from '@/api/api'

const { id } = defineProps<{
  id: number
}>()

const emit = defineEmits<{
  (e: 'close', id: number): void
}>()

const { data } = useQuery({
  enabled: false,
  queryKey: computed(() => ['character', id]),
  queryFn: () => api.character.get(id),
  select: data => ({
    ...data,
    range: (data.unit && data.start && data.end)
      ? UnitIDRange.fromDayjs(data.unit, data.start, data.end)
      : undefined,
  }),
})

const visible = ref(false)
</script>

<template>
  <Basic
    v-model:popup-visible="visible"
    resolved
    @close="$emit('close', id)"
  >
    <template #avatar>
      <img v-if="data?.avatar" :src="data.avatar">
      <div v-else i-radix-icons-question-mark-circled full></div>
    </template>
    {{ id }}
    <template #popover>
      <CharaDetailCard :id="id" />
    </template>
  </Basic>
</template>
