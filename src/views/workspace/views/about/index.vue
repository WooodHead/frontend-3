<script setup lang="ts">
const router = useRouter()
</script>

<template>
  <AModal title="关于" default-visible @close="router.back()"> 1 </AModal>
</template>
