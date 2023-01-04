<script setup lang="ts">
import { useFormItem } from '@arco-design/web-vue'
import type { CalendarValue } from '@arco-design/web-vue/es/date-picker/interface'
import type { TimePickerProps } from '@arco-design/web-vue/es/time-picker/interface'
import type { IUnit } from '@project-chiral/unit-system'

export interface RangePickerValue {
  unit: IUnit
  range: Date[]
}

const { modelValue, disabled = false, readonly = false } = defineProps<{
  modelValue?: RangePickerValue
  disabled?: boolean
  readonly?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: RangePickerValue): void
}>()

const { mergedDisabled, mergedError, mergedSize } = $(useFormItem({
  disabled: $$(disabled),
}))

const rangePickerConfig = $computed(() => {
  let showTime = false
  const props: Partial<TimePickerProps> = {}
  let mode: 'year' | 'month' | 'date' = 'date'

  switch (modelValue?.unit) {
    case 'century':
    case 'decade':
    case 'year':
      mode = 'year'
      break
    case 'month':
      mode = 'month'
      break
    case 'hour':
      showTime = true
      props.format = 'HH'
      break
    case 'minute':
      showTime = true
      props.format = 'HH:mm'
      break
    case 'second':
      showTime = true
      props.format = 'HH:mm:ss'
      break
  }

  return {
    mode,
    showTime,
    timePickerProps: props,
  }
})

const handleUnitChange = (unit: string | number | boolean) => {
  emit('update:modelValue', {
    unit: unit as IUnit,
    range: modelValue?.range || [new Date(), new Date()],
  })
}

const handleRangeChange = (range: (CalendarValue | undefined)[] | undefined) => {
  emit('update:modelValue', {
    range: range as [Date, Date],
    unit: modelValue?.unit || 'date',
  })
}
</script>

<template>
  <div column>
    <ARadioGroup
      type="button"
      rounded-b-0 w-full justify-between
      :disabled="mergedDisabled"
      :error="mergedError"
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
    <ARangePicker
      :readonly="readonly"
      rounded-t-0
      :disabled="mergedDisabled || modelValue?.unit === undefined"
      :error="mergedError"
      :size="mergedSize"
      :model-value="modelValue?.range"
      :exchange-time="false"
      :mode="rangePickerConfig.mode"
      :show-time="rangePickerConfig.showTime"
      :time-picker-props="rangePickerConfig.timePickerProps"
      @update:model-value="handleRangeChange"
      @clear="$emit('update:modelValue', undefined)"
    />
  </div>
</template>
