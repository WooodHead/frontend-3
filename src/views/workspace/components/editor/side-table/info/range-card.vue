<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { useStore } from '../../store'
import api from '@/api/api'
import { selectEvent, useEventUpdate } from '@/api/event'
import type { UnitIDRange } from '@/utils/unit-id'

const store = useStore()
const { eventId } = storeToRefs(store)

const range = ref<UnitIDRange>()

const { data } = useQuery({
  enabled: computed(() => eventId.value !== undefined),
  queryKey: computed(() => ['event', eventId.value]),
  queryFn: () => api.event.get(eventId.value!),
  select: selectEvent,
})
watchEffect(() => {
  if (!data.value) {
    return
  }
  range.value = data.value.range
})

const { mutateAsync: update } = useEventUpdate()
const handleVisibleChange = async (visible: boolean) => {
  if (!eventId.value || visible) {
    return
  }
  update({
    id: eventId.value,
    ...range.value?.toJSON(),
  })
}
</script>

<template>
  <ACard title="发生时间" :bordered="false">
    <template #extra>
      <ATrigger
        trigger="click"
        :popup-translate="[0, 8]"
        @popup-visible-change="handleVisibleChange"
      >
        <ALink :disabled="data?.done"> 修改 </ALink>
        <template #content>
          <div card-border p-2>
            <UnitRangePicker v-model="range" />
          </div>
        </template>
      </ATrigger>
    </template>
    {{ `${data?.range.start} - ${data?.range.end}` }}
  </ACard>
</template>
