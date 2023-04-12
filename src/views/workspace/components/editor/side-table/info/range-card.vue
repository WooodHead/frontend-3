<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { useStore } from '../../store'
import api from '@/api/api'
import { selectEvent, useEventUpdate } from '@/api/event'
import type { UnitIDRange } from '@/utils/unit-id'

const store = useStore()
const { eventId } = storeToRefs(store)

const val = ref<UnitIDRange>()

const { data } = useQuery({
  enabled: computed(() => eventId.value !== undefined),
  queryKey: computed(() => ['event', eventId.value]),
  queryFn: () => api.event.get(eventId.value!),
  select: selectEvent,
})
watch(() => data.value?.range, range => {
  val.value = range
})

const { mutate } = useEventUpdate()
const handleUpdate = () => {
  if (!eventId.value) { return }
  mutate({
    id: eventId.value,
    ...val.value?.toJSON(),
  })
}

// TODO range-card
</script>

<template>
  <ACard title="发生时间" :bordered="false">
    <template #extra>
      <ALink
        :disabled="data?.done"
        @click="handleUpdate"
      >
        修改
      </ALink>
    </template>
    {{ `${data?.range.start} - ${data?.range.end}` }}
  </ACard>
</template>
