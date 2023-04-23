<script setup lang="ts">
const { tooltip } = defineProps<{ tooltip: string }>()

const visible = ref(false)

const emit = defineEmits<{
  (e: 'click', ev: MouseEvent): void
}>()

const handleClick = (ev: MouseEvent) => {
  visible.value = false
  emit('click', ev)
}
</script>

<template>
  <ATooltip v-model:popup-visible="visible" position="left" :content="tooltip">
    <AButton shape="circle" type="primary" size="large" @click="handleClick">
      <slot></slot>
    </AButton>
  </ATooltip>
</template>
