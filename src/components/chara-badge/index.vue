<script setup lang="ts">
const { closable } = defineProps<{
  closable?: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()
</script>

<template>
  <ATrigger trigger="click">
    <div
      center-x
      w-fit h-26px
      transition-colors
      bg="blue-5 hover:blue-6 active:blue-7"
      rounded-full pr-4px gap-2px
      text-white cursor-pointer
      select-none
    >
      <div h-full aspect-square rounded-full>
        <slot name="avatar"></slot>
      </div>
      <div grow>
        <slot></slot>
      </div>
      <AButton
        v-if="closable"
        square-20px
        shape="circle" type="text"
        @click.stop="$emit('close')"
      >
        <template #icon>
          <div text-xs i-radix-icons-cross-1></div>
        </template>
      </AButton>
    </div>
    <template #content>
      <slot name="popover"></slot>
    </template>
  </ATrigger>
</template>
