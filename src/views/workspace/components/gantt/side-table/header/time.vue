<script setup lang="ts">
import { UnitID } from '@project-chiral/unit-id'
import { useStore } from '../../store'
import type { UnitTimePickerValue } from '@/components/unit-time-picker.vue'

const store = useStore()
const { unit, visibleUnit } = $(storeToRefs(store))

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
</script>

<template>
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
</template>
