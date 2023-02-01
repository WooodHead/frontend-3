<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { UnitID } from '@project-chiral/unit-id'
import { HEADER_HEIGHT } from '../const'
import { useStore } from '../store'
import EventItems from './event-items/index.vue'
import HistoryModal from './history-modal/index.vue'
import api from '@/api/api'
import type { UnitTimePickerValue } from '@/components/unit-time-picker.vue'

const store = useStore()
const { lock, unit, visibleUnit } = $(storeToRefs(store))

useQuery({
  staleTime: 0,
  queryKey: ['project', 'workspace', 'lock'],
  queryFn: () => api.project.getWorkspaceInfo(),
  onSuccess: ({ lock }) => { store.lock = lock },
})
watch(
  () => lock,
  lock => { api.project.updateWorkspaceInfo({ lock }) },
)

let timePickerVisible = $ref(false)
const timePickerValue = $computed(() => {
  if (!unit || !visibleUnit) { return undefined }
  return {
    unit,
    time: visibleUnit.toDate(),
  }
})
const handleTimeChange = ({ time, unit }: UnitTimePickerValue) => {
  timePickerVisible = false
  store.navigateTo(UnitID.fromDayjs(time, unit))
}

const historyVisible = $ref(false)
</script>

<template>
  <AResizeBox
    :directions="['right']"
    column h-full
    :style="{ width: '30%' }"
    rounded-l-lg shadow-lg
    z-10 bg-bg-2
  >
    <template #resize-trigger>
      <div w-4px h-full bg="border-1 hover:blue-4 active:blue-6"></div>
    </template>
    <div
      :style="{ height: `${HEADER_HEIGHT}px` }"
      column shrink-0 p-2 bg-bg-3
      border="b border-2"
      space-y-2
    >
      <ATrigger
        v-model:popup-visible="timePickerVisible"
        trigger="click"
        :popup-translate="[0, 8]"
      >
        <AButton>
          {{ store.visibleUnit?.toBriefString() }}
        </AButton>
        <template #content>
          <div card-border p-2>
            <UnitTimePicker
              :model-value="timePickerValue"
              @update:model-value="handleTimeChange"
            />
          </div>
        </template>
      </ATrigger>
      <div row h-40per space-x-1>
        <AButton
          title="锁定事件列表"
          long h-full
          :type="lock ? `primary` : `outline`"
          @click="lock = !lock"
        >
          <div v-if="lock" i-radix-icons-lock-closed></div>
          <div v-else i-radix-icons-lock-open-1></div>
        </AButton>
        <HistoryModal>
          <AButton
            title="操作历史记录"
            type="outline"
            h-full
            @click="historyVisible = true"
          >
            <template #icon>
              <div i-radix-icons-counter-clockwise-clock />
            </template>
          </AButton>
        </HistoryModal>
      </div>
    </div>
    <EventItems />
  </AResizeBox>
</template>
