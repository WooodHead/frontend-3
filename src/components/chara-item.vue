<script setup lang="ts">
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { Message } from '@arco-design/web-vue'
import type { AxiosError } from 'axios'
import api from '@/api/api'
import Item from '@/components/item/index.vue'
import type { CharacterEntity } from '@/api/api-base'

const { id, height, button, removable, animate } = defineProps<{
  id: number
  height?: number
  button?: boolean
  removable?: boolean
  animate?: boolean | Record<string, any>
}>()

const emit = defineEmits<{
  (e: 'click', chara: CharacterEntity): void
  (e: 'hover', chara: CharacterEntity): void
  (e: 'remove', chara: CharacterEntity): void
}>()

const { data } = useQuery({
  queryKey: computed(() => ['character', id]),
  queryFn: () => api.character.get(id),
})

// TODO chara-item
const client = useQueryClient()
const { mutateAsync: remove } = useMutation({
  mutationFn: () => api.character.remove(id),
  onSuccess: ({ id }) => {
    client.setQueryData(
      ['character'],
      (oldData: CharacterEntity[] | undefined) =>
        oldData?.filter(({ id: _id }) => _id !== id),
    )
    client.invalidateQueries(['character', id])
  },
  onError: ({ message }: AxiosError) => {
    Message.error(`删除角色失败: ${message}`)
  },
})

const handleClick = () => {
  if (!data.value) { return }
  emit('click', data.value)
}

const handleHover = () => {
  if (!data.value) { return }
  emit('hover', data.value)
}

const handleRemove = async () => {
  if (!data.value) { return }
  const chara = await remove()
  emit('remove', chara)
}
</script>

<template>
  <Item
    :button="button"
    :height="height"
    :animate="animate"
    :removable="removable"
    @click="handleClick"
    @hover="handleHover"
    @remove="handleRemove"
  >
    <AAvatar bg-primary-light-4 m-2 :size="32">
      {{ data?.name.slice(-2) }}
    </AAvatar>
    <div grow center-x>
      <div text="text-1" ellipsis>
        {{ data?.name }}
      </div>
      <div text="xs text-3" ellipsis>
        {{ data?.alias.join(', ') }}
      </div>
    </div>
  </Item>
</template>
