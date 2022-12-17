<script setup lang="ts">
import { useQuery, useQueryClient } from '@tanstack/vue-query'
import { UnitIDRange } from '@project-chiral/unit-system'
import { useStore } from '../../store'
import type { BlockProps } from './block.vue'
import Block from './block.vue'
import eventQuery from '@/api/event'

const store = useStore()
const { subUnitRange } = $(storeToRefs(store))

const client = useQueryClient()

const { data: events } = $(useQuery({
  enabled: computed(() => subUnitRange !== undefined),
  ...eventQuery.range(subUnitRange),
  onSuccess: events => {
    // 批量请求数据后，顺便更新一下单个请求的缓存
    for (const event of events) {
      client.setQueryData(eventQuery.id(event.id).queryKey, event)
    }
  },
}))

const blockData = $computed(() => events?.map(({ id, range, color, type }) => ({
  id,
  color,
  type,
  range: UnitIDRange.deserialize(range),
}) as BlockProps))
</script>

<template>
  <Block v-for="data in blockData" :key="data.id" v-bind="data" />
</template>
