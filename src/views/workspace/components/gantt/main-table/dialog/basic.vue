<script setup lang="ts">
import { Motion, Presence } from '@motionone/vue'
import { useDraggable } from '@/utils/useDraggable'
import { fadeInOut } from '@/utils/animation'

const { show, ready, okText } = defineProps<{
  show?: boolean
  ready?: boolean
  okText?: string
}>()

const emit = defineEmits<{
  (e: 'ok'): void | Promise<void>
  (e: 'cancel'): void
  (e: 'update:show', value: boolean): void
}>()

const target = ref<HTMLElement | null>(null)

const position = reactive({ x: 0, y: 0 })
const { x, y } = useDraggable(target, {
  onEnd: ({ x, y }) => {
    position.x += x
    position.y += y
  },
})
watch(
  () => show,
  (show) => {
    if (!show) {
      position.x = 0
      position.y = 0
    }
  }
)
</script>

<template>
  <Presence>
    <Motion
      v-if="show"
      v-bind="fadeInOut"
      ref="target"
      :style="{
        transform: `translate(${position.x + x}px, ${position.y + y}px)`,
      }"
      card-border
      column
      relative
      w-400px
      h-auto
      cursor-move
    >
      <div grow w-full center p-2>
        <slot></slot>
      </div>
      <div row w-full>
        <AButton long type="text" status="danger" @click="$emit('cancel')">
          取消
        </AButton>
        <AButton :disabled="!ready" long type="text" @click="$emit('ok')">
          {{ okText ?? '完成' }}
        </AButton>
      </div>
    </Motion>
  </Presence>
</template>
