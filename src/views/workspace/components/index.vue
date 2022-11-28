<script setup lang="ts">
import type { IPosition, IPositionState } from '../layout'

import Gantt from './gantt/index.vue'
import Editor from './editor/index.vue'
import Timeline from './timeline/index.vue'
import Characters from './characters/index.vue'

export interface ComponentProps {
  id: string // 组件的名称
  position?: IPosition // 组件位置，[column-start, row-start, column-end, row-end]
  state?: IPositionState // 组件所处的位置（角落，垂直，水平，全屏），用于动态调节组件显示的内容
  onClose?: () => void // 关闭组件的回调
}

const props = defineProps<ComponentProps>()
const { position, id } = $(props)

// TODO 为什么数组解构后失去响应性
const [colStart, colEnd, rowStart, rowEnd] = $(position)
</script>

<template>
  <div
    :class="`
    col-start-${position?.[0]}
    col-end-${position?.[1]}
    row-start-${position?.[2]}
    row-end-${position?.[3]}`"
  >
    <Gantt v-if="props.id === 'gantt'" :props="props" />
    <Editor v-else-if="props.id === 'editor'" :props="props" />
    <Timeline v-else-if="props.id === 'timeline'" :props="props" />
    <Characters v-else-if="props.id === 'characters'" :props="props" />
  </div>
</template>
