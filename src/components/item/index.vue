<script setup lang="ts">
import { Button } from '@arco-design/web-vue'
import { Motion } from '@motionone/vue'
import { fadeInOut } from '@/utils/animation/item'

const { height = 40, button = false, animate } = defineProps<{
  height?: number
  button?: boolean
  animate?: boolean | Record<string, any>
}>()

const emit = defineEmits<{
  (e: 'click'): void
  (e: 'hover'): void
}>()

const target = ref<HTMLDivElement | null>(null)
const hover = useElementHover(target)
whenever(hover, () => emit('hover'))

const animation = computed(() => {
  if (!animate) { return {} }
  if (typeof animate === 'object') { return animate }
  return fadeInOut(height)
})
</script>

<template>
  <Motion
    w-full
    v-bind="animation"
    :transition="{ duration: 0.2 }"
  >
    <component
      :is="button ? Button : 'div'"
      ref="target"
      type="text"
      row justify-center
      full p-0 m-0 rounded-0
      @click="$emit('click')"
    >
      <slot></slot>
    </component>
    <slot name="extra"></slot>
  </Motion>
</template>
