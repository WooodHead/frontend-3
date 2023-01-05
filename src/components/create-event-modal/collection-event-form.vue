<script setup lang="ts">
import type { CreateEventDto } from '@/api/api-base'

const { init } = defineProps<{
  init?: string[]
}>()

const model = $ref({
  name: '',
  description: '',
  graphIds: [] as string[],
})

const validate = async (): Promise<CreateEventDto> => {
  return Promise.reject(new Error('114514'))
  // return {
  //   ...model,
  //   type: 'COLLECTION',
  // }
}

defineExpose({ validate })
</script>

<template>
  <AForm :model="model">
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
      field="graphIds"
      label="子事件"
      :rules="[{ required: true, message: '请选择当前事件的子事件' }]"
    >
      <ATreeSelect
        v-model="model.graphIds"
        multiple allow-clear allow-search
      />
    </AFormItem>
  </AForm>
</template>
