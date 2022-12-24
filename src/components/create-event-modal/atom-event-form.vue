<script setup lang="ts">
import type { TimePickerProps } from '@arco-design/web-vue/es/time-picker/interface'
import type { UNITS } from '@project-chiral/unit-system'
import { Unit, UnitIDRange } from '@project-chiral/unit-system'
import type { FormRef } from '@/utils/types'
import type { CreateEventDto } from '@/api/api-base'

const formRef = $ref<FormRef>()

const model = $ref({
  name: '',
  description: '',
  unit: 'date' as typeof UNITS[number],
  range: [] as Date[],
  type: 'ATOM',
})

const validate = async () => {
  const error = await formRef?.validate()
  if (error) { return Promise.reject(error) }

  const { unit, range: [start, end], ...rest } = model

  const range = UnitIDRange.fromDayjs(start, end, Unit.fromUnit(unit))

  return {
    ...rest,
    range: range.serialize(),
    color: {},
    type: {},
  } as CreateEventDto
}

const rangePickerConfig = $computed(() => {
  let showTime = false
  const props: Partial<TimePickerProps> = {}
  let mode: 'year' | 'month' | 'date' = 'date'

  switch (model.unit) {
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

defineExpose({ validate })
</script>

<template>
  <AForm ref="formRef" :model="model">
    <AFormItem field="name" label="事件名称" required>
      <AInput v-model="model.name" />
    </AFormItem>
    <AFormItem field="description" label="事件描述">
      <ATextarea v-model="model.description" />
    </AFormItem>
    <AFormItem field="unit" label="时间单位" required>
      <ARadioGroup v-model="model.unit" type="button" w-full justify-between>
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
    </AFormItem>
    <AFormItem field="range" label="起止时间" required>
      <ARangePicker
        v-model="model.range"
        :exchange-time="false"
        :mode="rangePickerConfig.mode"
        :show-time="rangePickerConfig.showTime"
        :time-picker-props="rangePickerConfig.timePickerProps"
      />
    </AFormItem>
  </AForm>
</template>
