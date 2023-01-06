<script setup lang="ts">
import type { IUnit } from '@project-chiral/unit-system'
import { useStore } from '../../store'
import Basic from './basic.vue'
import type { RangePickerValue } from '@/components/pickers/range-picker.vue'
import RangePicker from '@/components/pickers/range-picker.vue'

const store = useStore()
let { subUnit, selectedRange } = $(storeToRefs(store))

let visible = $ref(false)

const value = $computed<RangePickerValue>(() => ({
  unit: subUnit as IUnit,
  range: selectedRange.map(v => v.date.toDate()),
}))
// 当日期没选择完全时始终是undefined，避免传入不完整数据
const init = $computed(() => value.range.length === 2 ? value : undefined)

const handleCancel = () => {
  selectedRange = []
}
const handleOk = () => {
  visible = true
}
const handleBeforeOk = () => {
  selectedRange = []
}
</script>

<template>
  <Basic
    :show="selectedRange.length > 0"
    :ready="selectedRange.length === 2"
    ok-text="创建原子事件"
    @cancel="handleCancel"
    @ok="handleOk"
  >
    <RangePicker :model-value="value" readonly />
  </Basic>
  <CreateEventModal
    v-model:visible="visible"
    :init="init"
    @before-ok="handleBeforeOk"
  />
</template>
