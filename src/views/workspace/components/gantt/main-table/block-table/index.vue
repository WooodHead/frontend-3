<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { useStore } from '../../store'
import Block from './block.vue'
import api from '@/api/api'
import { UnitIDRange } from '@/utils/unit-id'

const store = useStore()
const { subUnitRange, subUnit } = storeToRefs(store)

const { data: events } = useQuery({
  enabled: computed(() => subUnitRange !== undefined),
  queryKey: computed(() => ['event', 'list', 'range', subUnitRange.value?.toJSON()]),
  queryFn: () => api.event.getByRange(subUnitRange.value!.toJSON()),
  select: data => data
    .map(e => ({
      ...e,
      range: UnitIDRange.fromDayjs(e.unit, e.start, e.end),
    })),
})
// TODO unit切换

const version = ref(0)
watch(events, () => {
  version.value += 1
  store.visibleEvents.clear()
}, { deep: true })
</script>

<template>
  <Block
    v-for="data in events"
    :key="`${data.id}_${version}`"
    v-bind="data"
  />
</template>
