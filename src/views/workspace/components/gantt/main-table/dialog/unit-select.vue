<script setup lang="ts">
import type { IUnit } from '@project-chiral/unit-system'
import { useStore } from '../../store'
import type { RangePickerValue } from '@/components/pickers/range-picker.vue'
import RangePicker from '@/components/pickers/range-picker.vue'

const store = useStore()
const { subUnit, selectedRange } = $(storeToRefs(store))

const value = $computed<RangePickerValue>(() => {
  const [start, end] = selectedRange

  const startDate = start?.date.toDate()
  const endDate = end?.date.toDate()

  return {
    unit: subUnit as IUnit,
    range: [startDate, endDate],
  }
})
</script>

<template>
  <div>
    <RangePicker
      :model-value="value" readonly
    />
  </div>
</template>
