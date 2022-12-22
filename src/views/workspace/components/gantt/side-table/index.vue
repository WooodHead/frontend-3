<script setup lang="ts">
import { HEADER_HEIGHT } from '../const'
import { useStore } from '../store'
import EventItems from './event-items/index.vue'

const store = useStore()
</script>

<template>
  <div
    column
    h-full w="30%" min-w="20%" max-w="50%"
    rounded-l-lg shadow-lg
    resize-x overflow-x-hidden
    z-10 bg-bg-1
  >
    <div
      :style="{ height: `${HEADER_HEIGHT}px` }"
      center flex-shrink-0
      uno-border="b border-2"
    >
      {{ store.visibleUnit?.toString() }}
    </div>
    <EventItems />
  </div>
</template>
