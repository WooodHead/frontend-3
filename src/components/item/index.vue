<script setup lang="ts">
import { Button } from '@arco-design/web-vue'
import { Motion, Presence } from '@motionone/vue'
import { fadeInOut } from '@/utils/animation'
import { fadeInOut as fadeInOutItem } from '@/utils/animation/item'

const {
  height = 40,
  removable = false,
  removeText,
  button = false,
  animate,
} = defineProps<{
  removable?: boolean
  removeText?: string
  height?: number
  button?: boolean
  animate?: boolean | Record<string, any>
}>()

const emit = defineEmits<{
  (e: 'click'): void
  (e: 'hover'): void
  (e: 'remove'): void | Promise<void>
}>()

const target = ref<HTMLDivElement | null>(null)
const hover = useElementHover(target)
whenever(hover, () => emit('hover'))

const animation = computed(() => {
  if (!animate) {
    return {}
  }
  if (typeof animate === 'object') {
    return animate
  }
  return fadeInOutItem(height)
})

const deleteLoading = ref(false)
const handleRemove = async () => {
  deleteLoading.value = true
  await emit('remove')
  deleteLoading.value = false
}
</script>

<template>
  <Motion
    ref="target"
    relative
    w-full
    center-x
    v-bind="animation"
    :transition="{ duration: 0.2 }"
  >
    <component
      :is="button ? Button : 'div'"
      type="text"
      row
      justify-center
      full
      p-0
      m-0
      rounded-0
      @click="$emit('click')"
    >
      <slot></slot>
    </component>
    <slot name="extra"></slot>
    <Presence v-if="removable">
      <Motion v-if="hover" v-bind="fadeInOut" absolute right-2>
        <LongPressButton
          :title="removeText ?? '删除'"
          :loading="deleteLoading"
          status="danger"
          type="text"
          @press="handleRemove"
        >
          <template #icon>
            <div i-radix-icons-trash></div>
          </template>
        </LongPressButton>
      </Motion>
    </Presence>
  </Motion>
</template>
