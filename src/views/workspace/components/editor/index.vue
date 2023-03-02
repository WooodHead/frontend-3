<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import type { ComponentStatus } from '../type'
import SideTable from './side-table/index.vue'
import Content from './content/index.vue'
import { registerStore } from './store'
import emitter from '@/utils/emitter'
import type { EventEntity } from '@/api/api-base'
import type { SelectorOptionValue } from '@/components/selector/value'
import api from '@/api/api'

interface EditorProps {
  status: ComponentStatus
}

const { status } = defineProps<EditorProps>()

const store = registerStore(status.positionId)
const { editor, eventId, saving } = storeToRefs(store)
watch(() => status, status => {
  store.status = status
}, { deep: true })

const eventOption = ref<SelectorOptionValue>()

const { data } = useQuery({
  enabled: computed(() => eventId.value !== undefined),
  queryKey: computed(() => ['event', eventId.value]),
  queryFn: () => api.event.get(eventId.value!),
})
watch(data, data => {
  if (!data) { return }
  eventOption.value = { type: 'event', value: data, id: `event_${data.id}` }
}, { deep: true })

emitter.on('event-select', ({ event }) => {
  eventId.value = event.id
})
const handleSelect = (event: EventEntity | undefined) => {
  if (!event) { return }
  emitter.emit('event-select', { event })
}

// TODO 历史记录
</script>

<template>
  <div card column overflow-hidden>
    <ComponentHeader>
      <template #middle>
        <div row gap-2>
          <Selector
            v-model="eventOption"
            event
            placeholder="在这里选择要编辑的事件"
            @select:event="handleSelect"
            @clear="eventId = undefined"
          />
        </div>
      </template>
      <template #right>
        <div row space-x-2>
          <AButton type="outline" title="历史记录">
            <template #icon>
              <div i-radix-icons-counter-clockwise-clock text-lg></div>
            </template>
          </AButton>
        </div>
      </template>
    </ComponentHeader>
    <ResizeLayout
      :side-show="!!eventId"
      h-0 grow
    >
      <template #side>
        <SideTable />
      </template>
      <Content />
    </ResizeLayout>
    <ComponentFooter v-if="eventId">
      <template #right>
        <div row gap-2 text="xs text-3">
          <div>{{ saving ? '保存中...' : '已保存' }}</div>
          {{ editor.storage.characterCount.characters() }} 字
        </div>
      </template>
    </ComponentFooter>
  </div>
</template>
