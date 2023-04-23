<script setup lang="ts">
import type { CreateEventDto, EventEntity } from '@/api/api-base'
import type { FormRef } from '@/utils/types'

const { init } = defineProps<{
  init?: number[]
}>()

const formRef = ref<FormRef>()

const model = ref({
  name: '',
  description: '',
  subIds: new Set(init ?? []),
})

// TODO collection-event-form
const handleEventSelect = (event: EventEntity | undefined) => {
  if (!event) {
    return
  }
  model.value.subIds.add(event.id)
}

const validate = async (): Promise<CreateEventDto> => {
  const error = await formRef.value?.validate()
  if (error) {
    return Promise.reject(error)
  }

  return Promise.reject(new Error('114514'))
  // return {
  //   ...model,
  //   type: 'COLLECTION',
  // }
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
      field="subIds"
      label="子事件"
      :rules="[{ required: true, message: '请选择当前事件的子事件' }]"
    >
      <Selector event @select:event="handleEventSelect" />
    </AFormItem>
  </AForm>
</template>
