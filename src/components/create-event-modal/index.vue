<script setup lang="ts">
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { Message } from '@arco-design/web-vue'
import { UnitIDRange } from '@project-chiral/unit-id'
import { UnitRangePickerValue } from '../pickers/unit-range-picker.vue'
import AtomEventForm from './atom-event-form.vue'
import CollectionEventForm from './collection-event-form.vue'
import type { CreateEventDto, EventEntity } from '@/api/api-base'
import api from '@/api/api'

const { visible, init } = defineProps<{
  visible?: boolean
  init?: UnitRangePickerValue | number[]
}>()

const emit = defineEmits<{
  (e: 'update:visible', visible: boolean): void
  (e: 'beforeOk', data: EventEntity): void | Promise<void>
  (e: 'ok'): void
}>()

const type = $computed(() => {
  if (init === undefined) { return 'both' }
  if (Array.isArray(init)) { return 'collection' }
  return 'atom'
})

const title = $computed(() => {
  if (type === 'both') { return '创建事件' }
  if (type === 'atom') { return '创建原子事件' }
  return '创建集合事件'
})

const formRef = $ref<{ validate: () => Promise<CreateEventDto> }>()

const { mutateAsync } = useMutation({
  mutationFn: (data: CreateEventDto) => api.event.createEvent(data),
  onSuccess: () => {
    Message.success('创建事件成功')
  },
  onError: e => {
    Message.error(`创建事件失败：${e}`)
  },
})

const client = useQueryClient()
const handleBeforeOk = async () => {
  const data = await formRef!.validate()
  const event = await mutateAsync(data)

  const range = UnitIDRange.deserialize(event.range)
  for (const id of range.ids) {
    client.setQueryData<EventEntity[]>(
      ['event', { range: id.range.serialize() }],
      events => [...events ?? [], event],
    )
  }
  client.setQueryData(['event', event.id], event)

  emit('beforeOk', event)
  return true
}
</script>

<template>
  <AModal
    unmount-on-close
    :visible="visible"
    :title="title"
    @update:visible="$emit('update:visible', $event)"
    @before-ok="handleBeforeOk"
    @ok="$emit('ok')"
  >
    <AtomEventForm
      v-if="type === 'atom'"
      ref="formRef"
      :init="(init as UnitRangePickerValue)"
    />
    <CollectionEventForm
      v-else-if="type === 'collection'"
      ref="formRef"
      :init="(init as number[])"
    />
    <ATabs v-else lazy-load destroy-on-hide>
      <ATabPane :key="1" title="创建集合事件">
        <CollectionEventForm ref="formRef" />
      </ATabPane>
      <ATabPane :key="2" title="创建原子事件">
        <AtomEventForm ref="formRef" />
      </ATabPane>
    </ATabs>
  </AModal>
</template>
