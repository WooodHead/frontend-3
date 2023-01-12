<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { UnitID } from '@project-chiral/unit-id'
import { HEADER_HEIGHT } from '../const'
import { useStore } from '../store'
import EventItems from './event-items/index.vue'
import api from '@/api/api'
import type { UnitTimePickerValue } from '@/components/pickers/unit-time-picker.vue'

const store = useStore()
const { lock, unit, visibleUnit } = $(storeToRefs(store))

const fixed = $ref(false)

useQuery({
  queryKey: ['project', 'workspace'],
  queryFn: () => api.project.getWorkspaceInfo(),
  select: ({ lock }) => lock,
  onSuccess: lock => { store.lock = lock },
})

watch(
  () => lock,
  lock => { api.project.updateWorkspaceInfo({ lock }) },
)

const value = $computed(() => {
  if (!unit || !visibleUnit) { return undefined }
  return {
    unit,
    time: visibleUnit.toDate(),
  }
})
const handleTimeChange = (value: UnitTimePickerValue) => {
  store.navigateTo(UnitID.fromDayjs(value.time, value.unit))
}
</script>

<template>
  <div
    column
    h-full w="30%" min-w="20%" max-w="50%"
    rounded-l-lg shadow-lg border="r-1 border-2"
    resize-x overflow-x-hidden
    z-10 bg-bg-2
  >
    <div
      :style="{ height: `${HEADER_HEIGHT}px` }"
      column shrink-0 p-2 bg-bg-3
      border="b border-2"
      space-y-2
    >
      <ATrigger trigger="click">
        <AButton>
          {{ store.visibleUnit?.toString() }}
        </AButton>
        <template #content>
          <div card-border p-2>
            <UnitTimePicker
              :model-value="value"
              @update:model-value="handleTimeChange"
            />
          </div>
        </template>
      </ATrigger>
      <AButton
        title="锁定事件列表"
        long h="40%"
        :type="lock ? `primary` : `outline`"
        @click="lock = !lock"
      >
        <div v-if="lock" i-radix-icons-lock-closed></div>
        <div v-else i-radix-icons-lock-open-1></div>
      </AButton>
    </div>
    <EventItems />
  </div>
</template>
