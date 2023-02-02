<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import api from '@/api/api'

const { inputValue } = defineProps<{
  inputValue?: string
}>()

const { data, suspense } = $(useQuery({
  enabled: computed(() => inputValue !== undefined && inputValue.length > 0),
  cacheTime: 0,
  queryKey: computed(() => ['event', 'search', 'name', inputValue]),
  queryFn: () => api.event.searchEventName({ text: inputValue! }),
}))

await suspense()
</script>

<template>
  <AOptgroup
    v-if="data?.length ?? 0 > 0"
    :label="`事件名称中包含 “${inputValue}” 的事件`"
  >
    <AOption
      v-for="event of data"
      :key="event.id"
      :value="{ type: 'event', value: event }"
      :label="`${event.serial}. ${event.name}`"
    >
      <EventItem :id="event.id" />
    </AOption>
  </AOptgroup>
</template>
