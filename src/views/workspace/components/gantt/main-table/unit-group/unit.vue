<script setup lang="ts">
import { UNIT_WIDTH } from '../../const'

let activate = $ref(false)

const handleDoubleClick = () => {
  activate = !activate
}
</script>

<template>
  <div
    :draggable="false"
    :style="{ width: `${UNIT_WIDTH}px`, height: `${99999}px` }"
    relative column cursor-pointer
    transition-colors duration-100
    border-gray-200 outline="2 blue-400"
    :class="`${activate
      ? `border-r-0 bg-blue-100 hover:bg-blue-200 outline z-10`
      : `border-r-2 bg-gray-100 hover:bg-gray-200 outline-none`}`"

    @dblclick="handleDoubleClick"
  />
</template>
