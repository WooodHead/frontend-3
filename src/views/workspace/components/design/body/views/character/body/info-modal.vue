<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import api from '@/api/api'
import type { UpdateCharacterDto } from '@/api/api-base'
import type { FormRef } from '@/utils/types'
import { useCharaUpdate } from '@/api/character'
const { id, visible = false } = defineProps<{
  id: number
  visible?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:visible', visible: boolean): void
}>()

const model = ref<UpdateCharacterDto>({})
const formRef = ref<FormRef>()

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
}, { immediate: true })

const { mutateAsync: update } = useCharaUpdate(computed(() => id))

const handleBeforeOk = async () => {
  const error = await formRef.value?.validate()
  if (error) { return false }
  await update(model.value)
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
      <AFormItem
        field="name" label="名称"
        :rules="[{ required: true, message: '请输入名称' }]"
      >
        <AInput v-model="model.name" />
      </AFormItem>
      <AFormItem field="alias" label="别名">
        <AInputTag v-model="model.alias" allow-clear />
      </AFormItem>
      <AFormItem field="description" label="描述">
        <ATextarea v-model="model.description" />
      </AFormItem>
    </AForm>
  </AModal>
</template>
