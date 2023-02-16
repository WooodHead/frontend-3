<script setup lang="ts">
import { useFormItem } from '@arco-design/web-vue'
import type { CalendarValue } from '@arco-design/web-vue/es/date-picker/interface'
import type { IUnit } from '@project-chiral/unit-id'
import { UnitIDRange } from '@project-chiral/unit-id'
import usePickerConfig from './unit-time-picker/usePickerConfig'

const { modelValue, disabled = false, readonly = false } = defineProps<{
  modelValue?: UnitIDRange
  disabled?: boolean
  readonly?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: UnitIDRange): void
}>()

const unitValue = computed(() => modelValue?.unit.toString())
const pickerValue = computed(() => modelValue && modelValue.toDate())

const { mergedDisabled, mergedError, mergedSize } = useFormItem({
  disabled: computed(() => disabled),
})

const { mode, showTime, timePickerProps } = toRefs(usePickerConfig(unitValue))

const handleUnitChange = (unit: string | number | boolean) => {
  const [start, end] = pickerValue.value ?? []
  emit(
    'update:modelValue',
    UnitIDRange.fromDayjs(unit as IUnit, start, end),
  )
}

const handleRangeChange = (range: (CalendarValue | undefined)[] | undefined) => {
  const [start, end] = range ?? []
  if (!modelValue?.unit) { return }
  emit(
    'update:modelValue',
    UnitIDRange.fromDayjs(modelValue.unit, start, end),
  )
}
</script>

<template>
  <div column>
    <ARadioGroup
      type="button"
      rounded-b-0 w-full justify-between
      :disabled="mergedDisabled"
      :size="mergedSize"
      :model-value="unitValue"
      @update:model-value="handleUnitChange"
    >
      <ARadio value="century">
        世纪
      </ARadio>
      <ARadio value="decade">
        年代
      </ARadio>
      <ARadio value="year">
        年
      </ARadio>
      <ARadio value="month">
        月
      </ARadio>
      <ARadio value="date">
        日
      </ARadio>
      <ARadio value="hour">
        时
      </ARadio>
      <ARadio value="minute">
        分
      </ARadio>
      <ARadio value="second">
        秒
      </ARadio>
    </ARadioGroup>
    <ARangePicker
      :readonly="readonly"
      rounded-t-0
      :disabled="mergedDisabled || !unitValue"
      :error="mergedError"
      :size="mergedSize"
      :model-value="pickerValue"
      :exchange-time="false"
      :allow-clear="false"
      :mode="mode"
      :show-time="showTime"
      :time-picker-props="timePickerProps"
      @update:model-value="handleRangeChange"
    />
  </div>
</template>
