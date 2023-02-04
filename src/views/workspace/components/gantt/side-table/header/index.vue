<script setup lang="ts">
import { HEADER_HEIGHT } from '../../const'
import Time from './time.vue'
import Lock from './lock.vue'
import History from './history.vue'
</script>

<template>
  <div
    :style="{ height: `${HEADER_HEIGHT}px` }"
    column shrink-0 p-2 bg-bg-3
    border="b border-2"
    space-y-2
  >
    <Time />
    <div row h-40per space-x-1>
      <Lock />
      <History />
    </div>
  </div>
</template>
