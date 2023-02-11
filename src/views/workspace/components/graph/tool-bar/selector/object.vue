<script setup lang="ts">
import { useStore } from './store'

const store = useStore()
const { subject } = $(storeToRefs(store))
watchEffect(() => {
  console.log(subject)
})
</script>

<template>
  <ASelect
    :disabled="!subject"
    placeholder="选择事件、角色或场景"
  />
</template>
