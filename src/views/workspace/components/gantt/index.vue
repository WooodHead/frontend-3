<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { UnitID } from '@project-chiral/unit-id'
import type { ComponentStatus } from '../type'
import SideTable from './side-table/index.vue'
import MainTable from './main-table/index.vue'
import TimeBar from './time-bar/index.vue'
import { registerStore } from './store'
import type { IGanttData } from './types'
import Tools from './tools/index.vue'
import api from '@/api/api'

const { status, data } = defineProps<{
  status: ComponentStatus
  data?: IGanttData
}>()

const store = registerStore(status.positionId)
const { visibleUnit } = storeToRefs(store)

watch(
  () => status,
  status => { store.status = status },
  { deep: true },
)

if (data) { store.initWithData(data) }

const { suspense } = useQuery({
  enabled: computed(() => !data),
  staleTime: 0,
  queryKey: ['project', 'workspace', 'origin'],
  queryFn: () => api.project.getWorkspaceInfo(),
  select: ({ origin }) => origin,
  onSuccess: id => {
    if (!id) { store.init(UnitID.fromDayjs(new Date(), 'month')) }
    else { store.init(UnitID.deserialize(id)) }
  },
  onError: () => {
    store.init(UnitID.fromDayjs(new Date(), 'month'))
  },
})

await suspense()

watchDebounced(visibleUnit, visibleUnit => {
  if (!visibleUnit) { return }
  api.project.updateWorkspaceInfo({
    origin: visibleUnit.serialize(),
  })
}, { debounce: 100 })
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
