<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { UnitID } from '@project-chiral/unit-system'
import type { ComponentProps } from '../index.vue'
import SideTable from './side-table/index.vue'
import MainTable from './main-table/index.vue'
import TimeBar from './time-bar/index.vue'
import { registerStore } from './store'
import type { IGanttData } from './types'
import Tools from './tools/index.vue'
import Status from '@/components/status.vue'
import api from '@/api/api'

interface GanttProps {
  props: ComponentProps
  data?: IGanttData
}
const { props, data } = defineProps<GanttProps>()
const { id, state, position, onClose } = $(props)

const store = registerStore(id)

if (data !== undefined) { store.initWithData(data) }

const { isSuccess, isLoading, isError } = $(useQuery({
  queryKey: ['workspace'],
  queryFn: api.project.getWorkspaceInfo,
  select: ({ origin }) => origin,
  enabled: data === undefined,
  onSuccess: id => { store.init(UnitID.deserialize(id)) },
}))

onUnmounted(() => {
  api.project.updateWorkspaceInfo({ origin: store.visibleUnit?.serialize() })
})
</script>

<template>
  <div full column>
    <div
      card
      column overflow-hidden
    >
      <ComponentHeader v-if="!store.fullMode">
        <template #left>
        </template>
        <template #middle>
        </template>
        <template #right>
          <!-- <v-btn color="primary">
            保存并关闭
          </v-btn> -->
          <AButton type="primary">
            保存并关闭
          </AButton>
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
