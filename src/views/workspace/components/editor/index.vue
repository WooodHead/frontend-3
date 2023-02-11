<script setup lang="ts">
import type { ComponentStatus } from '../type'
import SideTable from './side-table/index.vue'
import Content from './content/index.vue'
import { registerStore } from './store'
import emitter from '@/utils/emitter'
import type { EventEntity } from '@/api/api-base'
import type { SelectorOptionValue } from '@/components/selector/value'

interface EditorProps {
  status: ComponentStatus
}

const { status } = defineProps<EditorProps>()

const store = registerStore(status.positionId)
const { editor, eventId, saving } = storeToRefs(store)
watch(() => status, status => {
  store.status = status
}, { deep: true })

const event = ref<SelectorOptionValue>()
emitter.on('event-select', ({ event: e }) => {
  event.value = { type: 'event', value: e, id: `event_${e.id}` }
  store.eventId = e.id
})
const handleSelect = (eventEntity: EventEntity | undefined) => {
  if (!eventEntity) { return }
  emitter.emit('event-select', { event: eventEntity })
}

// TODO 历史记录
</script>

<template>
  <div card column overflow-hidden>
    <ComponentHeader>
      <template #middle>
        <div row gap-2>
          <Selector
            v-model="event"
            event
            placeholder="在这里选择要编辑的事件"
            @select:event="handleSelect"
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
      <template #main>
        <Content />
      </template>
    </ResizeLayout>
    <ComponentFooter>
      <template #right>
        <div
          v-if="eventId"
          row gap-2
          text="xs text-3"
        >
          <div>{{ saving ? '保存中...' : '已保存' }}</div>
          {{ editor.storage.characterCount.characters() }} 字
        </div>
      </template>
    </ComponentFooter>
  </div>
</template>
