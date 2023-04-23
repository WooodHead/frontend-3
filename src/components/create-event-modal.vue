<script setup lang="ts">
import AtomEventForm from './create-event-modal/atom-event-form.vue'
import CollectionEventForm from './create-event-modal/collection-event-form.vue'
import { UnitIDRange } from '@/utils/unit-id'
import type { CreateEventDto } from '@/api/api-base'
import { useEventCreate } from '@/api/event'

const { visible, init } = defineProps<{
  visible?: boolean
  init?: UnitIDRange | number[]
}>()

const emit = defineEmits<{
  (e: 'update:visible', visible: boolean): void
  (e: 'before-ok', id: number): void
  (e: 'ok'): void
}>()

const type = computed(() => {
  if (init === undefined) {
    return 'both'
  }
  if (Array.isArray(init)) {
    return 'collection'
  }
  return 'atom'
})

const title = computed(() => {
  if (type.value === 'both') {
    return '创建事件'
  }
  if (type.value === 'atom') {
    return '创建原子事件'
  }
  return '创建集合事件'
})

const formRef = ref<{ validate: () => Promise<CreateEventDto> }>()

const { mutateAsync: create } = useEventCreate()

const handleBeforeOk = async () => {
  const data = await formRef.value!.validate()
  const event = await create(data)
  emit('before-ok', event.id)
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
      :init="(init as UnitIDRange)"
    />
    <CollectionEventForm
      v-else-if="type === 'collection'"
      ref="formRef"
      :init="(init as number[])"
    />
    <ATabs v-else lazy-load>
      <ATabPane :key="1" title="创建集合事件">
        <CollectionEventForm ref="formRef" />
      </ATabPane>
      <ATabPane :key="2" title="创建原子事件">
        <AtomEventForm ref="formRef" />
      </ATabPane>
    </ATabs>
  </AModal>
</template>
