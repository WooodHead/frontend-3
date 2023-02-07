<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import api from '@/api/api'

const { id } = defineProps<{
  id: number
}>()

const { data } = $(useQuery({
  enabled: false,
  queryKey: computed(() => ['character', id]),
  queryFn: () => api.character.getCharacter(id),
}))
</script>

<template>
  <ATrigger trigger="click">
    <div
      center-x
      w-fit h-30px
      transition-colors
      bg="blue-5 hover:blue-6"
      rounded-full
      text-white pr-4px gap-2px
      cursor-pointer
    >
      <div h-full aspect-square rounded-full>
        <img v-if="data?.avatar" :src="data.avatar">
        <div v-else i-radix-icons-avatar full></div>
      </div>
      <div grow>
        {{ id }}
      </div>
    </div>
  </ATrigger>
</template>
