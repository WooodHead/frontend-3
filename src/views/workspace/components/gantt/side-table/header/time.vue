<script setup lang="ts">
import { useStore } from '../../store'
import { UnitID } from '@/utils/unit-id'
import type { UnitTimePickerValue } from '@/components/unit-time-picker.vue'

const store = useStore()
const { unit, visibleUnit } = storeToRefs(store)

const timePickerVisible = ref(false)
const timePickerValue = computed(() => {
  if (!unit.value || !visibleUnit.value) {
    return undefined
  }
  return {
    unit: unit.value,
    time: visibleUnit.value?.toDate(),
  }
})
const handleTimeChange = ({ time, unit }: UnitTimePickerValue) => {
  timePickerVisible.value = false
  store.navigateTo(UnitID.fromDayjs(unit, time))
}
</script>

<template>
  <ATrigger
    v-model:popup-visible="timePickerVisible"
    trigger="click"
    :popup-translate="[0, 8]"
  >
    <AButton>
      {{ visibleUnit?.toBriefString() }}
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
