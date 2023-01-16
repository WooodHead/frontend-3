<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import api from '@/api/api'

const { id, height = 40 } = defineProps<{
  id: number
  height?: number
}>()

const { data } = useQuery({
  queryKey: computed(() => ['event', id]),
  queryFn: () => api.event.getEvent(id),
})
</script>

<template>
  <AButton
    :style="{ height: `${height}px` }"
    type="text" long p-0 m-0
    rounded-0
  >
    <div bg-primary-6 shrink-0 h-full w-4px />
    <div grow center-x p-2>
      {{ data?.name }}
    </div>
  </AButton>
</template>
