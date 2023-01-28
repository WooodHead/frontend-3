<script setup lang="ts">
import type { IUnit } from '@project-chiral/unit-id'
import { useStore } from '../../store'
import Basic from './basic.vue'

import type { UnitRangePickerValue } from '@/components/pickers/unit-range-picker.vue'

const store = useStore()
const { subUnit, selectedRange } = $(storeToRefs(store))

const visible = $ref(false)

const value = $computed<UnitRangePickerValue>(() => ({
  unit: subUnit as IUnit,
  range: selectedRange.map(v => v.toDate()),
}))
// 当日期没选择完全时始终是undefined，避免传入不完整数据
const init = $computed(() => value.range.length === 2 ? value : undefined)
</script>

<template>
  <Basic
    :show="selectedRange.length > 0"
    :ready="selectedRange.length === 2"
    ok-text="创建原子事件"
    @cancel="selectedRange = []"
    @ok="visible = true"
  >
    <UnitRangePicker :model-value="value" readonly />
  </Basic>
  <CreateEventModal
    v-model:visible="visible"
    :init="init"
    @ok="selectedRange = []"
  />
</template>
