<script setup lang="ts">
const { defaultSideWidth = '40%', sideShow = true, sideShadow } = defineProps<{
  defaultSideWidth?: number | string
  sideShow?: boolean
  sideShadow?: boolean
}>()

const width = $computed(() => typeof defaultSideWidth === 'number' ? `${defaultSideWidth}px` : defaultSideWidth)
</script>

<template>
  <div row>
    <AResizeBox
      v-if="sideShow"
      :directions="['right']"
      :shadow="sideShadow ? 'lg' : 'none'"
      nim-column h-full z-10
      :style="{ width }"
    >
      <template #resize-trigger>
        <div
          w-4px h-full
          transition-colors
          bg="border-1 hover:blue-4 active:blue-6"
        ></div>
      </template>
      <slot name="side"></slot>
    </AResizeBox>
    <slot name="main"></slot>
  </div>
</template>
