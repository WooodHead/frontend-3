<script setup lang="ts">
const visible = ref(false)
</script>

<template>
  <APopover
    v-model:popup-visible="visible"
    title="操作历史记录"
    trigger="click"
    w-300px
  >
    <AButton title="操作历史记录" type="outline" h-full @click="visible = true">
      <template #icon>
        <div i-radix-icons-counter-clockwise-clock />
      </template>
    </AButton>
    <template #content>
      <AList my-4>
        <AListItem> 1 </AListItem>
      </AList>
    </template>
  </APopover>
</template>
