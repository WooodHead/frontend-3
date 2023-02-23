<script setup lang="ts">
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import type { AxiosError } from 'axios'
import { Message } from '@arco-design/web-vue'
import api from '@/api/api'
import type { UpdateCharacterDto } from '@/api/api-base'
import type { FormRef } from '@/utils/types'
const { id, visible = false } = defineProps<{
  id: number
  visible?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:visible', visible: boolean): void
}>()

const model = ref<UpdateCharacterDto>({})
const formRef = ref<FormRef>()
const client = useQueryClient()

const { data } = useQuery({
  queryKey: computed(() => ['character', id]),
  queryFn: () => api.character.get(id),
})
watch(data, data => {
  if (!data) { return }
  model.value = {
    ...data,
    description: data.description ?? undefined,
    avatar: data.avatar ?? undefined,
    unit: data.unit ?? undefined,
    start: data.start ?? undefined,
    end: data.end ?? undefined,
  }
})

const { mutateAsync } = useMutation({
  mutationFn: (dto: UpdateCharacterDto) => api.character.update(id, dto),
  onSuccess: data => {
    client.setQueryData(['character', id], data)
  },
  onError: ({ message }: AxiosError) => {
    Message.error(`更新角色失败: ${message}`)
  },
})

const handleBeforeOk = async () => {
  const error = formRef.value?.validate()
  if (error) { return false }
  await mutateAsync(model.value)
  emit('update:visible', false)
  return true
}
</script>

<template>
  <AModal
    title="基本信息"
    :visible="visible"
    @update:visible="$emit('update:visible', $event)"
    @before-ok="handleBeforeOk"
  >
    <AForm ref="formRef" :model="model">
      <AFormItem label="名称" :rules="[{ required: true, message: '请输入名称' }]">
        <AInput v-model="model.name" />
      </AFormItem>
      <AFormItem label="别名">
        <ASelect v-model="model.alias" multiple allow-create />
      </AFormItem>
      <AFormItem label="描述">
        <ATextarea v-model="model.description" />
      </AFormItem>
    </AForm>
  </AModal>
</template>
