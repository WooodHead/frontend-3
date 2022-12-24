<script setup lang="ts">
import type { UnitIDRange } from '@project-chiral/unit-system'
import { useMutation } from '@tanstack/vue-query'
import { Message } from '@arco-design/web-vue'
import AtomEventForm from './atom-event-form.vue'
import CollectionEventForm from './collection-event-form.vue'
import type { CreateEventDto } from '@/api/api-base'
import api from '@/api/api'

const { init } = defineProps<{
  init?: string[] | UnitIDRange
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
    Message.error(`${e}`)
  },
})

const handleBeforeOk = async () => {
  const data = await formRef!.validate()
  console.log(data)

  // await mutateAsync(data)
  return true
}
</script>

<template>
  <AModal
    :visible="true"
    :title="title"
    @before-ok="handleBeforeOk"
  >
    <AtomEventForm v-if="type === 'atom'" ref="formRef" />
    <CollectionEventForm v-else-if="type === 'collection'" ref="formRef" />
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
