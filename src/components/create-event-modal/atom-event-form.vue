<script setup lang="ts">
import { Unit, UnitIDRange } from '@project-chiral/unit-system'
import RangePicker from '../pickers/range-picker.vue'
import type { RangePickerValue } from '../pickers/range-picker.vue'
import type { FormRef } from '@/utils/types'
import type { CreateEventDto } from '@/api/api-base'

const formRef = $ref<FormRef>()

const model = $ref({
  name: '',
  description: '',
  range: {} as RangePickerValue,
  type: 'ATOM',
})

const validate = async () => {
  const error = await formRef?.validate()
  if (error) { return Promise.reject(error) }

  const { range: { unit, range: [start, end] }, ...rest } = model

  const range = UnitIDRange.fromDayjs(start, end, Unit.fromUnit(unit))

  return {
    ...rest,
    range: range.serialize(),
    color: {},
    type: {},
  } as CreateEventDto
}
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
    <AFormItem field="range" label="时间范围" required>
      <RangePicker />
    </AFormItem>
  </AForm>
</template>
