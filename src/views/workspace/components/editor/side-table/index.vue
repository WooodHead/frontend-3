<script setup lang="ts">
import { useStore } from '../store'
import Info from './info/index.vue'
import Todo from './todo/index.vue'
import Relation from './relation/index.vue'

const store = useStore()
const { todoDot, relationDot } = storeToRefs(store)
const active = ref('info')
</script>

<template>
  <ATabs v-model:active-key="active" hide-content>
    <ATabPane key="info" title="消息" />
    <ATabPane key="todo">
      <template #title>
        <ABadge :count="Number(todoDot)" :offset="[6, 2]" dot>
          待办
        </ABadge>
      </template>
    </ATabPane>
    <ATabPane key="relation">
      <template #title>
        <ABadge :count="Number(relationDot)" :offset="[6, 2]" dot>
          关联
        </ABadge>
      </template>
    </ATabPane>
  </ATabs>
  <div grow h-0 overflow-y-auto p-2>
    <Info v-show="active === 'info'" />
    <Todo v-show="active === 'todo'" />
    <Relation v-show="active === 'relation'" />
  </div>
</template>
