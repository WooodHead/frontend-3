<script setup lang="ts">
const { resolved = false, popupVisible } = defineProps<{
  resolved?: boolean
  popupVisible: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'update:popup-visible', visible: boolean): void
}>()
</script>

<template>
  <ATrigger
    :popup-visible="popupVisible"
    trigger="click"
    :popup-translate="[0, 8]"
    @update:popup-visible="$emit('update:popup-visible', $event)"
  >
    <div
      center-x
      w-fit h-26px
      transition-colors
      :bg="resolved
        ? 'blue-5 hover:blue-6 active:blue-7'
        : 'gray-5 hover:gray-6 active:gray-7'"
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
