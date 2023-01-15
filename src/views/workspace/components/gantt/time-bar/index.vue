<script setup lang="ts">
import { useStore as useGanttStore } from '../store'
import { registerStore } from './store'
import BlockList from './block-list/index.vue'
import { BLOCK_WIDTH } from './const'

const { id } = defineProps<{ id: string }>()

const store = registerStore(id)
const ganttStore = useGanttStore()

const viewPortRef = toRef(store, 'viewPort')

const handlePrevClick = () => {
  store.offset += BLOCK_WIDTH
  ganttStore.navigateToPrev()
}

const handleNextClick = () => {
  store.offset -= BLOCK_WIDTH
  ganttStore.navigateToNext()
}
</script>

<template>
  <div card row h-10 mt-4 overflow-hidden>
    <AButton type="text" h-full rounded-0 @click="handlePrevClick">
      <template #icon>
        <div i-radix-icons-caret-left text-2xl></div>
      </template>
    </AButton>
    <div ref="viewPortRef" grow shrink-0 overflow-x-hidden>
      <BlockList />
    </div>
    <AButton type="text" h-full rounded-0 @click="handleNextClick">
      <template #icon>
        <div i-radix-icons-caret-right text-2xl></div>
      </template>
    </AButton>
  </div>
</template>
