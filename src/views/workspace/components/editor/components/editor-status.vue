<script setup lang="ts">
const { success, error, loading } = defineProps<{
  success?: boolean
  error?: boolean
  loading?: boolean
}>()
</script>

<template>
  <ABadge
    v-if="error"
    status="danger"
    text="保存失败"
  />
  <ABadge
    v-else-if="loading"
    status="warning"
    text="保存中"
  />
  <ABadge
    v-else-if="success"
    status="success"
    text="保存成功"
  />
</template>
