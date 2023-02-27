<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import Basic from './index.vue'
import { UnitIDRange } from '@/utils/unit-id'
import api from '@/api/api'
import { useCharaDisconnectEvent } from '@/api/character'

const { id, eventId, closable } = defineProps<{
  id: number
  eventId: number
  closable?: boolean
}>()

const emit = defineEmits<{
  (e: 'close', id: number): void
}>()

const { data } = useQuery({
  queryKey: computed(() => ['character', id]),
  queryFn: () => api.character.get(id),
  select: data => ({
    ...data,
    range: (data.unit && data.start && data.end)
      ? UnitIDRange.fromDayjs(data.unit, data.start, data.end)
      : undefined,
  }),
})
const { mutateAsync: disconnect } = useCharaDisconnectEvent(computed(() => id))

const visible = ref(false)

const handleClose = async () => {
  if (!data.value) { return }
  await disconnect({ events: [eventId] })
  emit('close', id)
}
</script>

<template>
  <Basic
    v-model:popup-visible="visible"
    :closable="closable"
    resolved
    @close="handleClose"
  >
    <template #avatar>
      <img v-if="data?.avatar" :src="data.avatar">
      <div v-else i-radix-icons-avatar full></div>
    </template>
    {{ data?.name }}
    <template #popup>
      <CharaDetailCard :id="id" />
    </template>
  </Basic>
</template>
