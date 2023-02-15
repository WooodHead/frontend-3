<script setup lang="ts">
import { UnitIDRange } from '@project-chiral/unit-id'
import { useStore } from '../../store'
import Basic from './basic.vue'

const store = useStore()
const { subUnit, selectedRange } = storeToRefs(store)

watchEffect(() => {
  console.log(selectedRange.value)
})

const visible = ref(false)

const value = computed<UnitIDRange | undefined>(() => {
  if (selectedRange.value.length !== 2 || !subUnit.value) { return undefined }
  const [start, end] = selectedRange.value
  return UnitIDRange.fromUnitID(start, end).as(subUnit.value)
})
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
    :init="value"
    @ok="selectedRange = []"
  />
</template>
