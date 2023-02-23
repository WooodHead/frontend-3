<script setup lang="ts">
import { useMutation, useQuery } from '@tanstack/vue-query'
import { Message } from '@arco-design/web-vue'
import type { AxiosError } from 'axios'
import { UnitIDRange } from '@/utils/unit-id'
import type { CharacterEntity, CreateCharacterDto } from '@/api/api-base'
import type { FormRef } from '@/utils/types'
import api from '@/api/api'

const { visible, id } = defineProps<{
  visible?: boolean
  id?: number
}>()

const emit = defineEmits<{
  (e: 'update:visible', visible: boolean): void
  (e: 'before-ok', data: CharacterEntity): void
  (e: 'ok'): void
}>()

const { data } = useQuery({
  enabled: computed(() => id !== undefined),
  queryKey: computed(() => ['character', id]),
  queryFn: () => api.character.get(id!),
  select: data => ({
    ...data,
    range: (data.unit && data.start && data.end)
      ? UnitIDRange.fromDayjs(data.unit, data.start, data.end)
      : undefined,
  }),
})

const { mutateAsync } = useMutation({
  mutationFn: ({ data }: { data: CreateCharacterDto }) => api.character.create(data),
  onSuccess: () => {
    Message.success('角色创建成功')
  },
  onError: ({ message }: AxiosError) => {
    Message.error(`角色创建失败: ${message}`)
  },
})

const formRef = ref<FormRef>()
const model = ref({
  name: data.value?.name,
  description: data.value?.description,
  range: data.value?.range,
})

const handleBeforeOk = async () => {
  // await mutateAsync()
}
</script>

<template>
  <AModal
    unmount-on-close
    :visible="visible"
    @update:visible="$emit('update:visible', $event)"
    @before-ok="handleBeforeOk"
    @ok="$emit('ok')"
  >
    <AForm ref="formRef" :model="model">
      <AFormItem>
        <AInput />
      </AFormItem>
      <AFormItem>
        <UnitRangePicker v-model="model.range" />
      </AFormItem>
    </AForm>
  </AModal>
</template>
