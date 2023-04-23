<script setup lang="ts">
const router = useRouter()
</script>

<template>
  <AModal title="帮助" default-visible @close="router.back()"> 1 </AModal>
</template>
