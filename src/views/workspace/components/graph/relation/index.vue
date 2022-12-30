<script setup lang="ts">
import { useVueFlow } from '@vue-flow/core'
interface RelationProps {
  sourceX: number
  sourceY: number
  targetX: number
  targetY: number
  sourcePosition: string
  targetPosition: string
}

const { sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition } = defineProps<RelationProps>()

const { getNodes, connectionStartHandle, onConnectEnd, addEdges, edges } = useVueFlow()
</script>

<template>
  <div>1</div>
</template>
