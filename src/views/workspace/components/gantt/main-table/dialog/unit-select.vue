<script setup lang="ts">
import type { IUnit } from '@project-chiral/unit-system'
import { UnitIDRange } from '@project-chiral/unit-system'
import { useQueryClient } from '@tanstack/vue-query'
import { useStore } from '../../store'
import Basic from './basic.vue'
import type { RangePickerValue } from '@/components/pickers/range-picker.vue'
import RangePicker from '@/components/pickers/range-picker.vue'
import type { EventEntity } from '@/api/api-base'

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
const handleCreating = () => {
  visible = true
}
const client = useQueryClient()
const handleCreated = ({ range }: EventEntity) => {
  selectedRange = []
  // 创建事件的时间起点处所处的单位范围的缓存失效
  const startRange = UnitIDRange.deserialize(range).start.range
  client.invalidateQueries(['event', { range: startRange.serialize() }])
}
</script>

<template>
  <Basic
    :show="selectedRange.length > 0"
    :ready="selectedRange.length === 2"
    ok-text="创建原子事件"
    @cancel="handleCancel"
    @ok="handleCreating"
  >
    <RangePicker :model-value="value" readonly />
  </Basic>
  <CreateEventModal
    v-model:visible="visible"
    :init="init"
    @ok="handleCreated"
  />
</template>
