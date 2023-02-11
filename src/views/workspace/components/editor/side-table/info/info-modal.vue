<script setup lang="ts">
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { Unit, UnitIDRange } from '@project-chiral/unit-id'
import { Message } from '@arco-design/web-vue'
import type { AxiosError } from 'axios'
import { useStore } from '../../store'
import api from '@/api/api'
import type { UnitRangePickerValue } from '@/components/unit-range-picker.vue'
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
  range?: UnitRangePickerValue
}>({})
const { data, isLoading } = useQuery({
  enabled: computed(() => eventId.value !== undefined),
  queryKey: computed(() => ['event', eventId.value]),
  queryFn: () => api.event.getEvent(eventId.value!),
})
watch(data, data => {
  if (!data) { return }
  const { name, description, unit, start, end } = data
  model.name = name
  model.description = description ?? undefined
  model.range = {
    unit: Unit.fromOrder(unit).toString(),
    range: [new Date(start), new Date(end)],
  }
}, { immediate: true })

const { mutateAsync } = useMutation({
  mutationFn: ({ id, dto }: {
    id: number
    dto: UpdateEventDto
  }) => api.event.updateEvent(id, dto),
  onSuccess: data => {
    Message.success('修改成功')
    const range = UnitIDRange.deserialize(data.range)
    // TODO 强制更新时间跨度内的所有缓存，这里应该有更好的方法
    // TODO 更新时间跨度后，甘特图出问题
    client.setQueryData(['event', data.id], data)
    for (const id of range.ids) {
      client.invalidateQueries(['event', { range: id.range.serialize() }])
    }
    emitter.emit('reload', { reason: { type: 'gantt', context: data } })
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
    range: { unit, range: [start, end] },
  } = model as Required<typeof model>
  await mutateAsync({
    id: eventId.value,
    dto: {
      name,
      description,
      range: UnitIDRange.fromDayjs(start, end, unit).serialize(),
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
