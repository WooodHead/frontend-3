<script setup lang="ts">
import { Motion, Presence } from '@motionone/vue'
import { fadeInOut } from '@/utils/animation'

const { id, checked = false, disabled = false } = defineProps<{
  id: number
  title: string
  checked?: boolean
  disabled?: boolean
}>()
const emit = defineEmits<{
  (e: 'click', id: number): void
  (e: 'remove', id: number): void
}>()

const target = ref<HTMLDivElement | null>(null)
const hover = useElementHover(target)
</script>

<template>
  <div
    ref="target"
    relative center-x
    overflow-hidden
    transition-colors
    border="~ border-2 hover:primary-light-4"
    hover="text-primary-light-4"
    w-full h-48px
    :filter="checked ? 'grayscale' : 'none'"
    p-1 mb-1 cursor-pointer
    rounded shadow-none
    @click="!disabled && $emit('click', id)"
  >
    <div h-full w-20per center>
      <div :class="checked ? `i-radix-icons-check-circled` : `i-radix-icons-circle`"></div>
    </div>
    <div grow h-full center-x p-1 ellipsis>
      {{ title }}
    </div>
    <Presence>
      <Motion
        v-if="hover"
        v-bind="fadeInOut"
        center absolute right-0
        w-50px h-full bg-bg-1
      >
        <AButton
          :disabled="disabled"
          type="text" status="danger"
          @click.stop="$emit('remove', id)"
        >
          <template #icon>
            <div i-radix-icons-trash></div>
          </template>
        </AButton>
      </Motion>
    </Presence>
  </div>
</template>
