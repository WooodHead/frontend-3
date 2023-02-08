<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { Motion } from '@motionone/vue'
import api from '@/api/api'
import { fadeInOut } from '@/utils/animation'

const { id, animate } = defineProps<{
  id: number
  animate?: boolean | Record<string, any>
}>()

const { data } = $(useQuery({
  enabled: false,
  queryKey: computed(() => ['character', id]),
  queryFn: () => api.character.getCharacter(id),
}))

const animation = $computed(() => {
  if (!animate) { return {} }
  if (typeof animate === 'object') { return animate }
  return fadeInOut
})
</script>

<template>
  <ATrigger trigger="click">
    <Motion
      v-bind="animation"
      :transition="{ duration: 0.2 }"
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
    </Motion>
  </ATrigger>
</template>
