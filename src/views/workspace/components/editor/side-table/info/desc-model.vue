<script setup lang="ts">
import type { EventEntity, UpdateEventDto } from '@/api/api-base'
import type { FormRef } from '@/utils/types'
const { init } = defineProps<{
  init?: EventEntity
}>()

const formRef = $ref<FormRef>()
const data = $ref({
  description: init?.description ?? '',
})

const validate = () => {
  const error = formRef?.validate()
  if (error) { return Promise.reject(error) }
  return data as UpdateEventDto
}
</script>

<template>
  <AModal>
    <AForm ref="formRef" :model="data">
      <AFormItem field="description" label="事件描述">
        <ATextarea v-model="data.description" />
      </AFormItem>
    </AForm>
  </AModal>
</template>
