<script setup lang="ts">
import { useStore as useGanttStore } from '../store'
import { registerStore } from './store'
import BlockList from './block-list/index.vue'

const { id } = defineProps<{ id: string }>()

const ganttStore = useGanttStore()
const store = registerStore(id)
</script>

<template>
  <div card row h-10 mt-4 overflow-hidden>
    <div w-8>
      <AButton type="text" h="!full" rounded-0>
        <template #icon>
          <div i-radix-icons-caret-left text-2xl></div>
        </template>
      </AButton>
    </div>
    <div grow shrink-0 overflow-x-hidden>
      <BlockList />
    </div>
    <div w-8>
      <AButton type="text" h="!full" rounded-0>
        <template #icon>
          <div i-radix-icons-caret-right text-2xl></div>
        </template>
      </AButton>
    </div>
  </div>
</template>
