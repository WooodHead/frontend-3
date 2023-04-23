<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import type { ComponentStatus } from '../type'
import SideTable from './side-table/index.vue'
import MainTable from './main-table/index.vue'
import TimeBar from './time-bar/index.vue'
import { registerStore } from './store'
import Tools from './tools/index.vue'
import { UnitID } from '@/utils/unit-id'
import api from '@/api/api'

const { status } = defineProps<{
  status: ComponentStatus
}>()

const store = registerStore(status.positionId)
const { visibleUnit } = storeToRefs(store)

watch(
  () => status,
  (status) => {
    store.status = status
  },
  { deep: true }
)

const { suspense } = useQuery({
  cacheTime: 0,
  queryKey: ['project', 'workspace', 'origin'],
  queryFn: () => api.project.getWorkspace(),
  select: ({ origin }) => origin,
  onSuccess: (id) => {
    if (!id) {
      store.init(UnitID.fromDayjs('month'))
    } else {
      store.init(UnitID.deserialize(id))
    }
  },
  onError: () => {
    store.init(UnitID.fromDayjs('month'))
  },
})

await suspense()

watchDebounced(
  visibleUnit,
  (visibleUnit) => {
    if (!visibleUnit) {
      return
    }
    api.project.updateWorkspace({
      origin: visibleUnit.serialize(),
    })
  },
  { debounce: 100 }
)
</script>

<template>
  <div full column>
    <div card column overflow-hidden>
      <ResizeLayout relative h-0 grow side-shadow>
        <template #side>
          <SideTable />
        </template>
        <MainTable />
        <Tools />
      </ResizeLayout>
    </div>
    <TimeBar v-if="store.fullMode" :id="status.positionId" />
  </div>
</template>
