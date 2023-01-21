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
import Status from '@/components/status.vue'
import api from '@/api/api'

interface GanttProps {
  status: ComponentStatus
  data?: IGanttData
}
const { status, data } = defineProps<GanttProps>()

const store = registerStore(status.position)
const { visibleUnit } = $(storeToRefs(store))

watch(() => status, status => {
  store.status = status
}, { deep: true })

if (data !== undefined) { store.initWithData(data) }

const { isSuccess, isLoading, isError, suspense } = $(useQuery({
  enabled: computed(() => data === undefined),
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
}))

await suspense()

// TODO 考虑修改为页面关闭和组件卸载时触发
watch(
  () => visibleUnit,
  visibleUnit => {
    if (visibleUnit) {
      api.project.updateWorkspaceInfo({ origin: visibleUnit.serialize() })
    }
  })
</script>

<template>
  <div full column>
    <div card column overflow-hidden>
      <div relative row h-0 grow>
        <SideTable />
        <MainTable v-if="isSuccess" />
        <Status v-else grow :error="isError" :loading="isLoading" />
        <Tools />
      </div>
    </div>
    <TimeBar v-if="store.fullMode" :id="status.id" />
  </div>
</template>
