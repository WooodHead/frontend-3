<script setup lang="ts">
import { useQuery, useQueryClient } from '@tanstack/vue-query'
import { UnitIDRange } from '@project-chiral/unit-system'
import { useStore } from '../../store'
import type { BlockProps } from './block.vue'
import Block from './block.vue'
import api from '@/api/api'

const store = useStore()
const { unitRange, subUnitRange } = $(storeToRefs(store))

// TODO 可以考虑优化事件请求的缓存
// const ranges = $computed(() => unitRange?.ids.map(range => UnitIDRange.fromUnitID(range.firstChild, range.lastChild)))
// const results = useQueries({
//   queries: computed(() => ranges?.map(range => ({
//     enabled: range !== undefined,
//     queryKey: ['event', { range: range?.serialize() }],
//     queryFn: () => api.event.getEvents({ range: range?.serialize() }),
//   })) ?? []),
// })

const client = useQueryClient()

const { data: eventData } = $(useQuery({
  // enabled: computed(() => subUnitRange !== undefined),
  enabled: false,
  queryKey: computed(() => ['event', { range: subUnitRange?.serialize() }]),
  queryFn: () => api.event.getEvents({ range: subUnitRange?.serialize() }),
  onSuccess: events => {
    // 批量请求数据后，顺便更新一下单个请求的缓存
    for (const event of events) {
      client.setQueryData(['event', event.id], event)
    }
  },
}))

const blockData = $computed(() => eventData?.map(({ id, range, color, type }) => ({
  id,
  color,
  type,
  range: UnitIDRange.deserialize(range),
}) as BlockProps))

watchEffect(() => {
  console.log(blockData)
})
</script>

<template>
  <Block v-for="data in blockData" :key="data.id" v-bind="data" />
</template>
