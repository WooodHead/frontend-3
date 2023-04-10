<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { useStore } from '../../store'
import type { UnitIDRange } from '@/utils/unit-id'
import type { FormRef } from '@/utils/types'
import { selectEvent, useEventUpdate } from '@/api/event'
import api from '@/api/api'

const { visible } = defineProps<{
  visible: boolean
}>()

const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void
}>()

const store = useStore()
const { eventId } = storeToRefs(store)

const formRef = ref<FormRef>()
const model = reactive<{
  name?: string
  description?: string
  range?: UnitIDRange
}>({})

const { data } = useQuery({
  enabled: computed(() => !!eventId.value),
  queryKey: computed(() => ['event', eventId.value]),
  queryFn: () => api.event.get(eventId.value!),
  select: selectEvent,
})
watch(data, data => {
  if (!data) { return }
  const { name, description, range } = data
  model.name = name
  model.description = description ?? undefined
  model.range = range
}, { immediate: true })

const { mutateAsync: update, isLoading } = useEventUpdate()

const handleBeforeOk = async () => {
  if (!eventId.value || !formRef.value) { return false }
  const error = await formRef.value.validate()
  if (error) { return false }
  const {
    name,
    description,
    range,
  } = model as Required<typeof model>
  await update({
    id: eventId.value,
    name,
    description,
    ...range.toJSON(),
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
