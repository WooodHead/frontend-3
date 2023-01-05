<script setup lang="ts">
import { Unit, UnitIDRange } from '@project-chiral/unit-system'
import RangePicker from '../pickers/range-picker.vue'
import type { RangePickerValue } from '../pickers/range-picker.vue'
import type { FormRef } from '@/utils/types'
import type { CreateEventDto } from '@/api/api-base'

const { init } = defineProps<{
  init?: RangePickerValue
}>()

const formRef = $ref<FormRef>()

const model = $ref({
  name: '',
  description: '',
  range: init ?? {
    unit: 'date',
    range: [new Date(), new Date()],
  },
  type: 'ATOM',
})

const validate = async (): Promise<CreateEventDto> => {
  const error = await formRef?.validate()
  if (error) { return Promise.reject(error) }

  const { range: { unit, range: [start, end] }, ...rest } = model

  const range = UnitIDRange.fromDayjs(start, end, Unit.fromUnit(unit))

  return {
    ...rest,
    range: range.serialize(),
    type: 'ATOM',
  }
}
defineExpose({ validate })
</script>

<template>
  <AForm ref="formRef" :model="model">
    <AFormItem
      field="name"
      label="事件名称"
      :rules="[{ required: true, message: '请给事件起个名字' }]"
    >
      <AInput v-model="model.name" />
    </AFormItem>
    <AFormItem field="description" label="事件描述">
      <ATextarea v-model="model.description" />
    </AFormItem>
    <AFormItem
      field="range"
      label="时间范围"
      :rules="[{ required: true, message: '请选择事件的时间范围' }]"
    >
      <RangePicker v-model="model.range" />
    </AFormItem>
  </AForm>
</template>
