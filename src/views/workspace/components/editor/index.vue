<script setup lang="ts">
import type { ComponentStatus } from '../type'
import SideTable from './side-table/index.vue'
import Content from './content/index.vue'
import EditorStatus from './components/editor-status.vue'
import { registerStore } from './store'

interface EditorProps {
  status: ComponentStatus
}

const { status } = defineProps<EditorProps>()

const store = registerStore(status.position)

watch(
  () => status,
  status => {
    store.status = status
  },
  { deep: true },
)
</script>

<template>
  <div card column overflow-hidden>
    <ComponentHeader>
      <template #middle>
        <ATreeSelect w-full />
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
      <SideTable />
      <Content />
    </div>
    <ComponentFooter>
      <template #right>
        <EditorStatus />
      </template>
    </ComponentFooter>
  </div>
</template>
