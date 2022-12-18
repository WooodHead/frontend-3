<script setup lang="ts">
import { useQuery, useQueryClient } from '@tanstack/vue-query'
import { UnitIDRange } from '@project-chiral/unit-system'
import { useStore } from '../../store'
import type { BlockProps } from './block.vue'
import Block from './block.vue'
import api from '@/api/api'

const store = useStore()
const { subUnitRange } = $(storeToRefs(store))

const client = useQueryClient()

const result = useQuery({
  enabled: computed(() => subUnitRange !== undefined),
  queryKey: ['event', 'range', subUnitRange],
  queryFn: () => api.event.getEvents({ range: subUnitRange?.serialize() }),
  onSuccess: events => {
    // 批量请求数据后，顺便更新一下单个请求的缓存
    for (const event of events) {
      client.setQueryData(['event', event.id], event)
    }
  },
})

const blockData = $computed(() => result.data.value?.map(({ id, range, color, type }) => ({
  id,
  color,
  type,
  range: UnitIDRange.deserialize(range),
}) as BlockProps))
</script>

<template>
  <Block v-for="data in blockData" :key="data.id" v-bind="data" />
</template>
