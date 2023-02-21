<script setup lang="ts">
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { Message } from '@arco-design/web-vue'
import type { AxiosError } from 'axios'
import { useStore } from '../../store'
import { UnitIDRange } from '@/utils/unit-id'
import api from '@/api/api'
import type { FormRef } from '@/utils/types'
import type { UpdateEventDto } from '@/api/api-base'
import emitter from '@/utils/emitter'

const { visible } = defineProps<{
  visible: boolean
}>()

const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void
}>()

const store = useStore()
const { eventId } = storeToRefs(store)
const client = useQueryClient()

const formRef = ref<FormRef>()
const model = reactive<{
  name?: string
  description?: string
  range?: UnitIDRange
}>({})
const { data, isLoading } = useQuery({
  enabled: computed(() => eventId.value !== undefined),
  queryKey: computed(() => ['event', eventId.value]),
  queryFn: () => api.event.get(eventId.value!),
  select: data => ({
    ...data,
    range: UnitIDRange.fromDayjs(data.unit, data.start, data.end),
  }),
})
watch(data, data => {
  if (!data) { return }
  const { name, description, range } = data
  model.name = name
  model.description = description ?? undefined
  model.range = range
}, { immediate: true })

const { mutateAsync } = useMutation({
  mutationFn: ({ id, dto }: {
    id: number
    dto: UpdateEventDto
  }) => api.event.update(id, dto),
  onSuccess: data => {
    Message.success('修改成功')
    // TODO 更新时间跨度后，甘特图出问题
    client.setQueryData(['event', data.id], data)
    client.invalidateQueries(['event', 'range'])
    emitter.emit('reload', {})
  },
  onError: (e: AxiosError) => {
    Message.error(`修改失败: ${e.message}`)
  },
})

const handleBeforeOk = async () => {
  if (!eventId.value || !formRef.value) { return false }
  const error = await formRef.value.validate()
  if (error) { return false }
  const {
    name,
    description,
    range,
  } = model as Required<typeof model>
  await mutateAsync({
    id: eventId.value,
    dto: {
      name,
      description,
      ...range.toJSON(),
    },
  })
  return true
}
</script>

<template>
  <AModal
    title="修改事件"
    :visible="visible"
    :ok-loading="isLoading"
    @update:visible="$emit('update:visible', $event)"
    @before-ok="handleBeforeOk"
  >
    <AForm ref="formRef" :model="model">
      <AFormItem label="事件名称" field="name">
        <AInput v-model="model.name" />
      </AFormItem>
      <AFormItem label="时间" field="range">
        <UnitRangePicker v-model="model.range" />
      </AFormItem>
      <AFormItem label="事件简介" field="description">
        <ATextarea v-model="model.description" />
      </AFormItem>
    </AForm>
  </AModal>
</template>
