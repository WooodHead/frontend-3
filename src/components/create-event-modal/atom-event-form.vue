<script setup lang="ts">
import { UnitIDRange } from '@/utils/unit-id'
import type { FormRef } from '@/utils/types'
import type { CreateEventDto } from '@/api/api-base'

const { init } = defineProps<{
  init?: UnitIDRange
}>()

const formRef = ref<FormRef>()

const model = ref({
  name: '',
  description: '',
  range: init ?? UnitIDRange.fromDayjs('month'),
  color: '#93c5fd',
})

const validate = async (): Promise<CreateEventDto> => {
  const error = await formRef.value!.validate()
  if (error) { return Promise.reject(error) }

  const { range, ...rest } = model.value
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
      :rules="[
        { required: true, message: '请选择事件的时间范围' },
      ]"
    >
      <UnitRangePicker v-model="model.range" />
    </AFormItem>
  </AForm>
</template>
