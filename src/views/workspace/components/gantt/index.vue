<script setup lang="ts">
import { useMutation, useQuery } from '@tanstack/vue-query'
import { UnitID } from '@project-chiral/unit-system'
import type { ComponentProps } from '../index.vue'
import SideTable from './side-table/index.vue'
import MainTable from './main-table/index.vue'
import TimeBar from './time-bar/index.vue'
import { registerStore } from './store'
import type { IGanttData } from './types'
import Tools from './tools/index.vue'
import ganttQuery, { setOrigin } from '@/api/gantt'
import Status from '@/components/status.vue'

interface GanttProps {
  props: ComponentProps
  data?: IGanttData
}
const { props, data } = defineProps<GanttProps>()
const { id, state, position, onClose } = $(props)

const store = registerStore(id)

const { isError, isLoading, isSuccess } = $(useQuery({
  ...ganttQuery.origin,
  enabled: data === undefined,
  onSuccess: id => { store.init(UnitID.deserialize(id)) },
}))
watch($$(data), data => {
  if (data !== undefined) { store.initWithData(data) }
})

onUnmounted(async () => {
  if (store.visibleUnit) { await setOrigin(store.visibleUnit.serialize()) }
})
</script>

<template>
  <div full column>
    <div
      component-light dark:component-dark
      column overflow-hidden
    >
      <ComponentHeader v-if="!store.fullMode">
        <template #left>
        </template>
        <template #middle>
        </template>
        <template #right>
          <v-btn color="primary">
            保存并关闭
          </v-btn>
        </template>
      </ComponentHeader>
      <div relative row h-0 grow>
        <SideTable />
        <MainTable v-if="isSuccess" />
        <div v-else grow>
          <Status :error="isError" :loading="isLoading" />
        </div>
        <Tools />
      </div>
    </div>
    <TimeBar v-if="store.fullMode" :id="id" />
  </div>
</template>
