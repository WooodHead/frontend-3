<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import api from '@/api/api'
import Item from '@/components/item/index.vue'
import type { CharacterEntity } from '@/api/api-base'

const { id, height, button, animate } = defineProps<{
  id: number
  height?: number
  button?: boolean
  animate?: boolean | Record<string, any>
}>()

const emit = defineEmits<{
  (e: 'click', chara: CharacterEntity): void
  (e: 'hover', chara: CharacterEntity): void
}>()

const { data } = useQuery({
  queryKey: computed(() => ['character', id]),
  queryFn: () => api.character.get(id),
})

// TODO chara-item

const handleClick = () => {
  if (!data.value) { return }
  emit('click', data.value)
}

const handleHover = () => {
  if (!data.value) { return }
  emit('hover', data.value)
}
</script>

<template>
  <Item
    :button="button"
    :height="height"
    :animate="animate"
    @click="handleClick"
    @hover="handleHover"
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
