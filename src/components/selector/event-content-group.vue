<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import api from '@/api/api'

const { inputValue, eventSelect } = defineProps<{
  inputValue?: string
  eventSelect?: boolean
}>()

const { data, suspense } = useQuery({
  enabled: computed(() => inputValue !== undefined && inputValue.length > 0),
  cacheTime: 0,
  queryKey: computed(() => ['event', 'search', 'content', inputValue]),
  queryFn: () => api.event.searchContent({ text: inputValue! }),
})

await suspense()
</script>

<template>
  <AOptgroup
    v-if="data?.length ?? 0 > 0"
    :label="`事件描述中包含 “${inputValue}” 的事件`"
  >
    <AOption
      v-for="event of data"
      :key="event.id"
      :value="{ type: 'event', value: event }"
      :label="`${event.serial}. ${event.name}`"
    >
      <EventItem
        :id="event.id"
        :event-select="eventSelect"
      >
        <template #extra>
          <div text="xs text-2" mb-1>
            {{ event?.description }}
          </div>
        </template>
      </EventItem>
    </AOption>
  </AOptgroup>
</template>
