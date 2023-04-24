<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import api from '@/api/api'

const { id } = defineProps<{
  id: number
}>()

const { data } = useQuery({
  queryKey: computed(() => ['event', id]),
  queryFn: () => api.event.get(id),
})
</script>

<template>
  <EventDetailCardTrigger :id="id">
    <ALink>{{ data?.name }}</ALink>
  </EventDetailCardTrigger>
</template>
