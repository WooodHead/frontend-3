<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { SelectorOptionValue } from './value'
import api from '@/api/api'

const { searchValue } = defineProps<{
  searchValue?: string
}>()

const { data, suspense } = useQuery({
  enabled: computed(() => searchValue !== undefined && searchValue.length > 0),
  cacheTime: 0,
  queryKey: computed(() => ['event', 'search', 'content', searchValue]),
  queryFn: () => api.event.searchContent({ text: searchValue! }),
})

await suspense()
</script>

<template>
  <AOptgroup
    v-if="data?.length ?? 0 > 0"
    :label="`事件描述中包含 “${searchValue}” 的事件`"
  >
    <AOption
      v-for="event of data"
      :key="event.id"
      :value="({
        type: 'event',
        value: event,
        id: `event_${event.id}`,
      } as SelectorOptionValue)"
      :label="`${event.serial}. ${event.name}`"
    >
      <EventItem :id="event.id">
        <template #extra>
          <div text="xs text-2" mb-1>
            {{ event?.description }}
          </div>
        </template>
      </EventItem>
    </AOption>
  </AOptgroup>
</template>
