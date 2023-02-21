<script setup lang="ts">
import { useQueries, useQueryClient } from '@tanstack/vue-query'
import { useStore } from '../../store'
import type { BlockProps } from './block.vue'
import Block from './block.vue'
import { UnitIDRange } from '@/utils/unit-id'
import api from '@/api/api'
import type { EventEntity } from '@/api/api-base'

const store = useStore()
const { unitRange } = storeToRefs(store)

const client = useQueryClient()

const ranges = computed(() => unitRange.value?.ids.map(range => range.childrenRange))
const results = useQueries({
  queries: computed(() => ranges.value?.map(range => ({
    queryKey: ['event', 'range', { range: range.serialize() }],
    queryFn: () => api.event.getByRange({ ...range.toJSON() }),
    onSuccess: (events: EventEntity[]) => {
      // 批量请求数据后，顺序更新一下单个请求的缓存
      for (const event of events) {
        client.setQueryData(['event', event.id], event)
      }
    },
  })) ?? []),
})

// TODO 事件时间跨度包含多个单位时将会出现重复，需要去重
const eventData = computed(() => {
  const events = results
    .map(({ data }) => data)
    .flat()
    .filter(v => v !== undefined) as EventEntity[]

  return [...new Map(events.map(e => [e.id, e])).values()]
})

// TODO 更改单位层级时，需要重新计算
const blockData = computed(() =>
  eventData.value?.map(data => ({
    ...data,
    range: UnitIDRange.fromDayjs(data.unit, data.start, data.end),
  }) as BlockProps)
    .filter(({ range }) => range.unit.toString() === store.subUnit),
)

const version = ref(0)
watch(blockData, () => {
  version.value += 1
  store.visibleEvents.clear()
})
</script>

<template>
  <Block
    v-for="data in blockData"
    :key="`${data.id}_${version}`"
    v-bind="data"
  />
</template>
