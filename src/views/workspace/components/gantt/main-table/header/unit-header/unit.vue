<script setup lang="ts">
import type { UnitID } from '@project-chiral/unit-id'
import { HEADER_HEIGHT, UNIT_WIDTH } from '../../../const'
import { useStore } from '../../../store'

const { id, left, right } = defineProps<{
  id: UnitID
  left?: boolean
  right?: boolean
}>()

const store = useStore()
const offset = computed(() => store.subUnitOffset(id) * UNIT_WIDTH)
const { viewPort } = storeToRefs(store)

const target = ref<HTMLElement | null>(null)

// 加载下一个单位
useIntersectionObserver(
  target,
  ([{ isIntersecting }]) => {
    if (isIntersecting) {
      if (left) { store.loadLeft(4) }
      if (right) { store.loadRight(4) }
    }
  },
  {
    root: viewPort,
    threshold: [0, 1],
  },
)

// 检测当前单位是否可见
useIntersectionObserver(
  target,
  ([{ isIntersecting }]) => {
    if (isIntersecting) { store.visibleUnit = id }
  },
  {
    root: viewPort,
    rootMargin: '0px -50% 0px -50%',
    threshold: [0, 1],
  },
)
</script>

<template>
  <div
    ref="target"
    :title="id.toString()"
    :style="{
      left: `${offset}px`,
      width: `${id.children.length * UNIT_WIDTH}px`,
      height: `${HEADER_HEIGHT / 2}px`,
    }"
    absolute center
    bg-bg-2
    border="r b border-2"
    select-none z-50
  >
    {{ id.toString() }}
  </div>
</template>
