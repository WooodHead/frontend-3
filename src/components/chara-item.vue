<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import api from '@/api/api'
import Item from '@/components/item/index.vue'
import type { CharacterEntity } from '@/api/api-base'
import { useCharaRemove } from '@/api/character'

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
  select: data => ({
    ...data,
    avatar: data.avatar && `${import.meta.env.VITE_BASE_URL}/${data.avatar}`,
  }),
})

const avatarName = computed(() => {
  const name = data.value?.name
  if (!name) { return undefined }
  return name.includes(' ') ? name.split(' ')[0] : name.slice(-2)
})

// TODO chara-item
const { mutateAsync: remove } = useCharaRemove()

const handleRemove = async () => {
  if (!data.value) { return }
  const chara = await remove({ id })
  emit('remove', chara)
}
</script>

<template>
  <Item
    :button="button"
    :height="height"
    :animate="animate"
    :removable="removable"
    @click="data && $emit('click', data)"
    @hover="data && $emit('hover', data)"
    @remove="handleRemove"
  >
    <AAvatar bg-primary-light-4 m-2 :size="32">
      <img v-if="data?.avatar" :src="data.avatar">
      <div v-else>
        {{ avatarName }}
      </div>
    </AAvatar>
    <div grow center-x gap-2>
      <div text="text-1" ellipsis>
        {{ data?.name }}
      </div>
      <div text="xs text-3" ellipsis>
        {{ data?.alias.join(', ') }}
      </div>
    </div>
  </Item>
</template>
