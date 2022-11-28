<script setup lang="ts">
import { HEADER_HEIGHT } from '../const'
import EventItems from './event-items/index.vue'

const title = $ref<string>('114514')
</script>

<template>
  <div
    column
    h-full w="30%" min-w="20%" max-w="50%"
    bg-white rounded-l-lg shadow-lg
    resize-x overflow-x-hidden
    z-10
  >
    <div
      :style="{ height: `${HEADER_HEIGHT}px` }"
      center flex-shrink-0
      uno-border="b-2 gray-200"
    >
      {{ title }}
    </div>
    <EventItems />
  </div>
</template>
