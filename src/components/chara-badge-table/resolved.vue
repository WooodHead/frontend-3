<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import Basic from './basic.vue'
import { selectChara } from '@/api/chara'
import api from '@/api/api'
import { useRelationRemove } from '@/api/graph'
import { PARTICIPATED_IN } from '@/api/graph/schema'

const {
  id,
  eventId,
  closable,
  disabled = false,
} = defineProps<{
  id: number
  eventId: number
  closable?: boolean
  disabled?: boolean
}>()

const { data } = useQuery({
  queryKey: computed(() => ['chara', id]),
  queryFn: () => api.chara.get(id),
  select: selectChara,
})

const { mutateAsync: remove } = useRelationRemove()

const visible = ref(false)

const handleClose = async () => {
  if (!data.value) {
    return
  }
  await remove({
    type: PARTICIPATED_IN,
    from: id,
    to: eventId,
  })
}
</script>

<template>
  <Basic
    v-model:popup-visible="visible"
    :disabled="disabled"
    :closable="closable"
    resolved
    @close="handleClose"
  >
    <template #avatar>
      <img v-if="data?.avatar" :src="data.avatar" />
      <div v-else i-radix-icons-avatar full></div>
    </template>
    {{ data?.name }}
    <template #popup>
      <CharaDetailCard :id="id" />
    </template>
  </Basic>
</template>
