<script setup lang="ts">
const { tooltip } = defineProps<{ tooltip: string }>()

const emit = defineEmits<{
  (e: 'click', ev: MouseEvent): void
}>()
</script>

<template>
  <ATooltip position="left" :content="tooltip">
    <AButton
      shape="circle" type="primary" size="large"
      @click="$emit('click', $event)"
    >
      <slot></slot>
    </AButton>
  </ATooltip>
</template>
