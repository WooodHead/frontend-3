<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import api from '@/api/api'
import Item from '@/components/item/index.vue'
import type { CharacterEntity } from '@/api/api-base'

const { id, height, button } = defineProps<{
  id: number
  height?: number
  button?: boolean
}>()

const emit = defineEmits<{
  (e: 'click', chara: CharacterEntity): void
  (e: 'hover', chara: CharacterEntity): void
}>()

const { data } = $(useQuery({
  queryKey: computed(() => ['character', id]),
  queryFn: () => api.character.getCharacter(id),
}))

// TODO chara-item
</script>

<template>
  <Item
    :button="button"
    :height="height"
    @click="data && $emit('click', data)"
    @hover="data && $emit('hover', data)"
  >
    <AAvatar m-2>
      {{ data?.name }}
    </AAvatar>
    <div grow column>
      <div text="xs text-1" ellipsis>
        {{ data?.name }}
      </div>
      <div text="xs text-3" ellipsis>
        {{ data?.alias.join(', ') }}
      </div>
    </div>
  </Item>
</template>
