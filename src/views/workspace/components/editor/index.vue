<script setup lang="ts">
import type { ComponentStatus } from '../type'
import SideTable from './side-table/index.vue'
import Content from './content/index.vue'
import { registerStore } from './store'

interface EditorProps {
  status: ComponentStatus
}

const { status } = defineProps<EditorProps>()

const store = registerStore(`${status.id}_${status.position ?? ''}`)
const { editor, eventId } = $(storeToRefs(store))

watch(
  () => status,
  status => { store.status = status },
  { deep: true },
)
</script>

<template>
  <div card column overflow-hidden>
    <ComponentHeader>
      <template #middle>
        <div row gap-2>
          <EventSelector event-select />
        </div>
      </template>
      <template #right>
        <div row space-x-2>
          <AButton type="outline" title="历史记录">
            <template #icon>
              <div i-radix-icons-counter-clockwise-clock text-lg />
            </template>
          </AButton>
        </div>
      </template>
    </ComponentHeader>
    <div row h-0 grow>
      <SideTable v-if="eventId !== undefined" />
      <Content />
    </div>
    <ComponentFooter>
      <template #right>
        <div v-if="eventId" text="xs text-3">
          {{ editor.storage.characterCount.characters() }} 字
        </div>
      </template>
    </ComponentFooter>
  </div>
</template>
