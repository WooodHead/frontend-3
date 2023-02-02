<script setup lang="ts">
import { useStore } from './store'

const store = useStore()
const { object } = $(storeToRefs(store))
</script>

<template>
  <ASelect placeholder="选择事件、角色或场景" />
</template>
