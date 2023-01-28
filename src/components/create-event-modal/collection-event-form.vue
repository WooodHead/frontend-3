<script setup lang="ts">
import type { CreateEventDto } from '@/api/api-base'
import type { FormRef } from '@/utils/types'

const { init } = defineProps<{
  init?: number[]
}>()

const formRef = $ref<FormRef>()

const model = $ref({
  name: '',
  description: '',
  subIds: init ?? [],
})

const validate = async (): Promise<CreateEventDto> => {
  const error = await formRef?.validate()
  if (error) { return Promise.reject(error) }

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
    <!-- TODO 自定义FormItem，支持可视化选择子图 -->
    <AFormItem
      field="subIds"
      label="子事件"
      :rules="[{ required: true, message: '请选择当前事件的子事件' }]"
    >
      <ATreeSelect
        v-model="model.subIds"
        multiple allow-clear allow-search
      />
    </AFormItem>
  </AForm>
</template>
