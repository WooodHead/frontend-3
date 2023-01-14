<script setup lang="ts">
import Basic from './basic.vue'
</script>

<template>
  <ATrigger trigger="click" position="left" :popup-translate="[-10, 0]">
    <Basic tooltip="搜索">
      <div i-radix-icons-magnifying-glass text-2xl></div>
    </Basic>
    <template #content>
      <div card-border p-2 right-2>
        <EventSelector />
      </div>
    </template>
  </ATrigger>
</template>
