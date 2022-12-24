<script setup lang="ts">
const { tooltip } = defineProps<{ tooltip: string }>()
</script>

<template>
  <ATooltip position="left" :content="tooltip">
    <AButton shape="circle" type="primary" size="large">
      <slot></slot>
    </AButton>
  </ATooltip>
</template>
