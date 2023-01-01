<script setup lang="ts">
import type { UnitID } from '@project-chiral/unit-system'
import { BLOCK_WIDTH } from '../const'
import { useStore } from '../store'
import { useStore as useGanttStore } from '../../store'

const { id, left, right } = defineProps<{
  id: UnitID
  left: boolean
  right: boolean
}>()

const store = useStore()
const ganttStore = useGanttStore()

const target = ref<HTMLElement | null>(null)
const viewPortRef = toRef(store, 'viewPort')

const baseOffset = $computed(() => ganttStore.unitOffset(id) * BLOCK_WIDTH)
const active = $computed(() => ganttStore.visibleUnit?.isSame(id) ?? false)

useIntersectionObserver(
  target,
  ([{ isIntersecting }]) => {
    if (isIntersecting) {
      if (left) { store.loadLeft(20) }
      if (right) { store.loadRight(20) }
    }
  },
  {
    root: viewPortRef,
    // threshold: [0, 1],
  },
)

const handleClick = () => {
  ganttStore.navigateTo(id)
}
</script>

<template>
  <div
    ref="target"
    :style="{ transform: `translateX(${baseOffset}px)` }"
    absolute h-full border="r border-2"
  >
    <!-- <v-btn
      :width="BLOCK_WIDTH" height="100%"
      text-xs rounded-0
      :variant="`${active ? `tonal` : `text`}`"
      :color="`${active && `primary`}`"
      @click="handleClick"
    >
      {{ id.toBriefString() }}
    </v-btn> -->
    <AButton
      :style="{
        width: `${BLOCK_WIDTH}px`,
        height: '100%',
      }"
      text-xs rounded-0
      :type="active ? `primary` : `text`"
      @click="handleClick"
    >
      {{ id.toBriefString() }}
    </AButton>
  </div>
</template>
