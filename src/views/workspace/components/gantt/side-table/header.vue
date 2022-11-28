<script setup lang="ts">
import { HEADER_HEIGHT } from '../const'
const title = $ref<string>()
</script>

<template>
  <div
    :style="{ height: `${HEADER_HEIGHT}px` }"
    center flex-shrink-0
    uno-border="b-2 gray-200"
  >
    {{ title }}
  </div>
</template>
