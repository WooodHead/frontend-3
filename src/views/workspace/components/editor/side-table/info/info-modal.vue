<script setup lang="ts">
import { useMutation, useQuery } from '@tanstack/vue-query'
import { Unit, UnitIDRange } from '@project-chiral/unit-id'
import { Message } from '@arco-design/web-vue'
import type { AxiosError } from 'axios'
import { useStore } from '../../store'
import api from '@/api/api'
import type { UnitRangePickerValue } from '@/components/unit-range-picker.vue'
import type { FormRef } from '@/utils/types'
import type { UpdateEventDto } from '@/api/api-base'

const { visible } = defineProps<{
  visible: boolean
}>()

const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void
}>()

const store = useStore()
const { eventId } = $(storeToRefs(store))

watchEffect(() => {
  console.log(eventId)
})

let model = $ref<{
  name?: string
  description?: string
  range?: UnitRangePickerValue
}>({})
const ref = $ref<FormRef | null>(null)
const { isLoading } = $(useQuery({
  enabled: computed(() => eventId !== undefined),
  queryKey: computed(() => ['event', eventId]),
  queryFn: () => api.event.getEvent(eventId!),
  onSuccess: ({ name, description, unit, start, end }) => {
    model = {
      name,
      description: description ?? undefined,
      range: {
        unit: Unit.fromOrder(unit).toString(),
        range: [new Date(start), new Date(end)],
      },
    }
    console.log(model)
  },
}))
const { mutateAsync } = useMutation({
  mutationFn: ({ id, dto }: { id: number; dto: UpdateEventDto }) => api.event.updateEvent(id, dto),
  onSuccess: () => {
    Message.success('修改成功')
  },
  onError: (e: AxiosError) => {
    Message.error(`修改失败: ${e.message}`)
  },
})

const handleBeforeOk = async () => {
  if (!eventId || !ref) { return false }
  const error = await ref.validate()
  if (error) { return false }
  const { name, description, range: { unit, range: [start, end] } } = model as Required<typeof model>
  await mutateAsync({
    id: eventId,
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
    <AForm :ref="ref" :model="model">
      <AFormItem label="事件名称">
        <AInput v-model="model.name" />
      </AFormItem>
      <AFormItem label="时间">
        <UnitRangePicker v-model="model.range" />
      </AFormItem>
      <AFormItem label="事件简介">
        <ATextarea v-model="model.description" />
      </AFormItem>
    </AForm>
  </AModal>
</template>
