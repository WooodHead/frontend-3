<script setup lang="ts">
const { checked = false } = defineProps<{
  checked?: boolean
}>()
const emit = defineEmits<{
  (e: 'click'): void
}>()

const target = ref<HTMLDivElement | null>(null)
const hover = useElementHover(target)
</script>

<template>
  <div
    border="~ border-2 hover:primary-4"
    w-full h-48px rounded-sm shadow-none
    p-2
    :filter="checked ? 'grayscale' : 'none'"
    center-x
  >
    <div rounded-full :border="`~ ${hover ? 'primary-4' : 'border-2'}`" p-1></div>
  </div>
</template>
