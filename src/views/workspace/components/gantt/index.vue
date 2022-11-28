<script setup lang="ts">
import { onMounted } from 'vue'
import { UnitID } from '@project-chiral/unit-system'
import type { ComponentProps } from '../index.vue'
import SideTable from './side-table/index.vue'
import MainTable from './main-table/index.vue'
import TimeBar from './time-bar/index.vue'
import { registerStore } from './store'
import type { IGanttData } from './types'
import query from './query'
import { setOrigin } from '@/api/gantt'

interface GanttProps {
  props: ComponentProps
  data?: IGanttData
}

const { props, data } = defineProps<GanttProps>()
const { id, state, position, onClose } = $(props)

const store = registerStore(id)

onMounted(() => {
  if (data === undefined) { store.init(UnitID.fromDayjs('2022-11-20', 'month')) }
  else { store.initWithData(data) }
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
        <MainTable />
      </div>
    </div>
    <TimeBar v-if="store.fullMode" />
  </div>
</template>
