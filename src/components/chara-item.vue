<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import Item from '@/components/item/index.vue'
import { selectChara, useCharaRemove } from '@/api/chara'
import api from '@/api/api'

const { id, height, button, removable, animate } = defineProps<{
  id: number
  height?: number
  button?: boolean
  removable?: boolean
  animate?: boolean | Record<string, any>
}>()

const emit = defineEmits<{
  (e: 'click', id: number): void
  (e: 'hover', id: number): void
  (e: 'remove', id: number): void
}>()

const { data } = useQuery({
  queryKey: computed(() => ['chara', id]),
  queryFn: () => api.chara.get(id),
  select: selectChara,
})

const avatarName = computed(() => {
  const name = data.value?.name
  if (!name) {
    return undefined
  }
  return name.includes(' ') ? name.split(' ')[0] : name.slice(-2)
})

// TODO chara-item
const { mutateAsync: remove } = useCharaRemove()

const handleRemove = async () => {
  if (!data.value) {
    return
  }
  const chara = await remove({ id })
  emit('remove', chara.id)
}
</script>

<template>
  <Item
    :button="button"
    :height="height"
    :animate="animate"
    :removable="removable"
    @click="data && $emit('click', data.id)"
    @hover="data && $emit('hover', data.id)"
    @remove="handleRemove"
  >
    <AAvatar bg-primary-light-4 m-2 :size="32">
      <img v-if="data?.avatar" :src="data.avatar" />
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
