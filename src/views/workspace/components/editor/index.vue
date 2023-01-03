<script setup lang="ts">
import type { ComponentProps } from '../index.vue'
import SideTable from './side-table/index.vue'
import Content from './content/index.vue'
import EditorStatus from './components/editor-status.vue'

interface EditorProps {
  props: ComponentProps
}

const { props } = defineProps<EditorProps>()
const { id, state, position, onClose } = $(props)
</script>

<template>
  <div card column overflow-hidden>
    <ComponentHeader>
      <template #left>
        {{ }}
      </template>
      <template #middle>
        <ATreeSelect />
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
