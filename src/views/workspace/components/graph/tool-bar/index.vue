<script setup lang="ts">
import Selector from '../component/selector/index.vue'
</script>

<template>
  <div card h-54px mt-4 p-2 row items-center space-x-2>
    <div>
      <APagination :total="200" simple />
    </div>
    <div grow center-y>
      <Selector />
    </div>
    <div center-y>
      <!-- <AButtonGroup type="outline">
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
      </AButtonGroup> -->
      <AButton type="outline" title="历史记录">
        <template #icon>
          <div i-radix-icons-counter-clockwise-clock text-lg />
        </template>
      </AButton>
    </div>
  </div>
</template>
