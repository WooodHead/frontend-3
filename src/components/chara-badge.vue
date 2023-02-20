<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import api from '@/api/api'

const { id, closable = false } = defineProps<{
  id: number
  closable?: boolean
}>()

const emit = defineEmits<{
  (e: 'close', id: number): void
}>()

const { data } = useQuery({
  enabled: false,
  queryKey: computed(() => ['character', id]),
  queryFn: () => api.character.getCharacter(id),
})
</script>

<template>
  <ATrigger trigger="click">
    <div
      center-x
      w-fit h-26px
      transition-colors
      bg="blue-5 hover:blue-6 active:blue-7"
      rounded-full pr-4px gap-2px
      text-white cursor-pointer
      select-none
    >
      <div h-full aspect-square rounded-full>
        <img v-if="data?.avatar" :src="data.avatar">
        <div v-else i-radix-icons-avatar full></div>
      </div>
      <div grow>
        {{ id }}
      </div>
      <AButton
        v-if="closable"
        square-20px
        shape="circle" type="text"
        @click.stop="$emit('close', id)"
      >
        <template #icon>
          <div text-xs i-radix-icons-cross-1></div>
        </template>
      </AButton>
    </div>
    <template #content>
      <CharaDetailCard :id="id" />
    </template>
  </ATrigger>
</template>
