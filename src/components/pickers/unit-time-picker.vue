<script setup lang="ts">
import { useFormItem } from '@arco-design/web-vue'
import type { IUnit } from '@project-chiral/unit-id'
import { usePickerConfig } from './usePickerConfig'

export interface UnitTimePickerValue {
  unit: IUnit
  time: Date
}

const { modelValue, disabled = false, readonly = false } = defineProps<{
  modelValue?: UnitTimePickerValue
  disabled?: boolean
  readonly?: boolean
}>()
const unit = computed(() => modelValue?.unit)

const emit = defineEmits<{
  (e: 'update:modelValue', value: UnitTimePickerValue): void
}>()

const { mergedDisabled, mergedError, mergedSize } = $(useFormItem({
  disabled: $$(disabled),
}))

const { mode, showTime, timePickerProps } = $(usePickerConfig(unit))

watchEffect(() => {
  console.log(mode)
})

const handleUnitChange = (unit: string | number | boolean) => {
  emit('update:modelValue', {
    unit: unit as IUnit,
    time: modelValue?.time ?? new Date(),
  })
}
const handleTimeChange = (value: string | number | Date | undefined) => {
  emit('update:modelValue', {
    unit: modelValue?.unit ?? 'date',
    time: value as Date,
  })
}

const common = $computed(() => ({
  'disabled': mergedDisabled,
  'error': mergedError,
  'size': mergedSize,
  'model-value': modelValue?.time,
  'show-time': showTime,
  'time-picker-props': timePickerProps,
  'class': 'rounded-t-0',
  'allow-clear': false,
}))
</script>

<template>
  <div column>
    <ARadioGroup
      type="button"
      rounded-b-0 w-full justify-between
      :disabled="mergedDisabled"
      :size="mergedSize"
      :model-value="modelValue?.unit"
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

    <AYearPicker
      v-if="mode === 'year'"
      v-bind="common"
      @update:model-value="handleTimeChange"
    />
    <AMonthPicker
      v-else-if="mode === 'month'"
      v-bind="common"
      @update:model-value="handleTimeChange"
    />
    <ADatePicker
      v-else
      v-bind="common"
      @update:model-value="handleTimeChange"
    />
  </div>
</template>
