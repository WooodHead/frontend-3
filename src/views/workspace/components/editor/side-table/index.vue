<script setup lang="ts">
import Info from './info.vue'
import Todo from './todo.vue'
import Relation from './relation.vue'

const active = ref('info')
</script>

<template>
  <div border="r border-2" h-full w="1/3" column>
    <ATabs v-model:active-key="active" hide-content>
      <ATabPane key="info" title="信息" />
      <ATabPane key="todo" title="待办" />
      <ATabPane key="relation" title="关联" />
    </ATabs>
    <div space-y-2 h-0 grow overflow-y-auto p-2>
      <Info v-if="active === 'info'" />
      <Todo v-else-if="active === 'todo'" />
      <Relation v-else-if="active === 'relation'" />
    </div>
  </div>
</template>
