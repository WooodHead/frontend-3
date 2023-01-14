<script setup lang="ts">
import Info from './info.vue'
import Todo from './todo.vue'
import Relation from './relation.vue'

const active = ref('info')
</script>

<template>
  <div
    column
    border="r border-2"
    h-full min-w-1-3 max-w-1-2
    resize-x overflow-x-hidden
  >
    <ATabs v-model:active-key="active" hide-content>
      <ATabPane key="info" title="信息" />
      <ATabPane key="todo" title="待办" />
      <ATabPane key="relation" title="关联" />
    </ATabs>
    <div grow h-0 overflow-y-auto p-2 space-y-2>
      <Info v-if="active === 'info'" />
      <Todo v-else-if="active === 'todo'" />
      <Relation v-else-if="active === 'relation'" />
    </div>
  </div>
</template>
