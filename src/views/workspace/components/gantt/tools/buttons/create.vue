<script setup lang="ts">
import Basic from './basic.vue'

const visible = $ref(false)
</script>

<template>
  <Basic tooltip="新建" @click="visible = true">
    <div i-radix-icons-plus text-2xl></div>
  </Basic>
  <CreateEventModal v-model:visible="visible" />
</template>
