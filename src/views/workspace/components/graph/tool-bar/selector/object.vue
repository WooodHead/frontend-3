<script setup lang="ts">
import { useStore } from './store'
import type { SelectorOptionValue } from '@/components/selector/value'

const store = useStore()

const handleSelect = (value: SelectorOptionValue | undefined) => {
  store.object = value
}
</script>

<template>
  <Selector
    event character scene
    placeholder="选择事件、角色或场景"
    @select="handleSelect"
  />
</template>
