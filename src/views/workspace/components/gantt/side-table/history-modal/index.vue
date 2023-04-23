<script setup lang="ts">
// TODO 完成事件操作历史记录
</script>

<template>
  <APopover title="操作历史记录" trigger="click" w-300px>
    <slot></slot>
    <template #content>
      <AList my-4>
        <AListItem> 1 </AListItem>
      </AList>
    </template>
  </APopover>
</template>

<style scoped>
.arco-popover-popup-content {
  padding: 12px !important;
}
</style>
