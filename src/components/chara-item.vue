<script setup lang="ts">
import Item from '@/components/item/index.vue'
import { useCharaRemove } from '@/api/character'

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
