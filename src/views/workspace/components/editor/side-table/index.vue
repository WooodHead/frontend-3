<script setup lang="ts">
import Info from './info/index.vue'
import Todo from './todo/index.vue'
import Relation from './relation/index.vue'

const active = $ref('info')
</script>

<template>
  <AResizeBox
    :directions="['right']"
    nim-column h-full min-w-20per
    :style="{ width: '40%' }"
  >
    <template #resize-trigger>
      <div w-4px h-full bg="border-1 hover:blue-4 active:blue-6"></div>
    </template>
    <ATabs v-model:active-key="active" hide-content>
      <ATabPane key="info" title="信息" />
      <ATabPane key="todo" title="待办" />
      <ATabPane key="relation" title="关联" />
    </ATabs>
    <div grow h-0 overflow-y-auto p-2>
      <Info v-show="active === 'info'" />
      <Todo v-show="active === 'todo'" />
      <Relation v-show="active === 'relation'" />
    </div>
  </AResizeBox>
</template>
