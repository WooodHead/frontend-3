<script setup lang="ts">
const counter = useInterval(10)
</script>

<template>
  <div full center column>
    <div
      square-60px
      i-twemoji-thinking-face
      :style="{
        rotate: `${0.01 * counter * counter}deg`,
      }"
    ></div>
    <p text-lg>思考中……</p>
  </div>
</template>
