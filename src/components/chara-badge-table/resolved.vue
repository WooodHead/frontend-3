<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import Basic from './index.vue'
import { useRelationRemove } from '@/api/graph'
import { PARTICIPATED_IN } from '@/api/graph/schema'
import { selectChara } from '@/api/character'
import api from '@/api/api'

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
  select: selectChara,
})

const visible = ref(false)

const { mutateAsync: disconnect } = useRelationRemove()
const handleClose = async () => {
  if (!data.value) { return }
  await disconnect({
    type: PARTICIPATED_IN,
    from: id,
    to: eventId,
  })
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
