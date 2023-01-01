<script setup lang="ts">
</script>

<template>
  <div card h-54px mt-4 p-2 row items-center space-x-2>
    <div>
      <APagination :total="200" simple />
    </div>
    <div grow center-y>
      <ATreeSelect allow-search />
    </div>
    <div center-y>
      <AButtonGroup type="outline">
        <AButton title="返回">
          <template #icon>
            <div i-radix-icons-caret-left text-2xl />
          </template>
        </AButton>
        <AButton title="历史记录">
          <template #icon>
            <div i-radix-icons-counter-clockwise-clock text-lg />
          </template>
        </AButton>
        <AButton title="前进">
          <template #icon>
            <div i-radix-icons-caret-right text-2xl />
          </template>
        </AButton>
      </AButtonGroup>
    </div>
  </div>
</template>
