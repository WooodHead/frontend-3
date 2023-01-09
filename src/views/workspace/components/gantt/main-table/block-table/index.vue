<script setup lang="ts">
import { useQueries, useQueryClient } from '@tanstack/vue-query'
import { UnitIDRange } from '@project-chiral/unit-system'
import { useStore } from '../../store'
import type { BlockProps } from './block.vue'
import Block from './block.vue'
import api from '@/api/api'
import type { EventEntity } from '@/api/api-base'

const store = useStore()
const { unitRange, subUnitRange } = $(storeToRefs(store))

const client = useQueryClient()

// TODO 可以考虑优化事件请求的缓存
const ranges = $computed(() => unitRange?.ids.map(range => range.childrenRange))
const results = useQueries({
  queries: computed(() => ranges?.map(range => ({
    queryKey: ['event', { range: range?.serialize() }],
    queryFn: () => api.event.getEvents({ range: range?.serialize() }),
    onSuccess: (events: EventEntity[]) => {
      // 批量请求数据后，顺序更新一下单个请求的缓存
      for (const event of events) {
        client.setQueryData(['event', event.id], event)
      }
    },
  })) ?? []),
})

const eventData = $computed(() => results
  .map(({ data }) => data)
  .flat()
  .filter(v => v !== undefined) as EventEntity[])

// const { data: eventData } = $(useQuery({
//   // enabled: computed(() => subUnitRange !== undefined),
//   enabled: true,
//   queryKey: computed(() => ['event', { range: subUnitRange?.serialize() }]),
//   queryFn: () => api.event.getEvents({ range: subUnitRange?.serialize() }),
//   onSuccess: events => {
//     // 批量请求数据后，顺便更新一下单个请求的缓存
//     for (const event of events) {
//       client.setQueryData(['event', event.id], event)
//     }
//   },
// }))

const blockData = $computed(() => eventData?.map(({ range, ...rest }) => ({
  ...rest,
  range: UnitIDRange.deserialize(range),
}) as BlockProps))
</script>

<template>
  <Block v-for="data in blockData" :key="data.id" v-bind="data" />
</template>
