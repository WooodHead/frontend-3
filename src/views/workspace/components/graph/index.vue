<script setup lang="ts">
import type { Edge, Node } from '@vue-flow/core'
import { VueFlow, useVueFlow } from '@vue-flow/core'
import { Background, Controls, MiniMap } from '@vue-flow/additional-components'
import type { ComponentProps } from '../index.vue'
import EventNode from './event-node/index.vue'
import ToolBar from './tool-bar/index.vue'

interface GraphProps {
  props: ComponentProps
}

const { props } = defineProps<GraphProps>()
const { id, state, position, onClose } = $(props)

let nodes = $ref<Node[]>([])
const edges = $ref<Edge[]>([])
const { nodes: graphNodes, addEdges, onConnectStart, onConnectEnd, onConnect, addSelectedNodes, removeSelectedNodes } = $(useVueFlow())
// useForceLayout()

onMounted(() => {
  nodes = Array(2).fill(0).map((_, i) => ({
    id: `${i}`,
    type: 'event',
    position: { x: i * 200, y: 0 },
    label: `Node ${i}`,
  }))

  // edges.push(...Array(19).fill(0).map((_, i) => ({
  //   id: `${i}_${i + 1}`,
  //   source: `${i}`,
  //   target: `${i + 1}`,
  //   updateable: true,
  // })))
})

let connectingNodeId = $ref<string>()
onConnectStart(({ nodeId }) => {
  connectingNodeId = nodeId
  addSelectedNodes(graphNodes.filter(({ id }) => id === nodeId))
})
onConnectEnd(() => {
  connectingNodeId = undefined
  removeSelectedNodes(graphNodes.filter(({ id }) => id === connectingNodeId))
})
</script>

<template>
  <div full column>
    <div card>
      <VueFlow
        v-model:nodes="nodes"
        v-model:edges="edges"
        fit-view-on-init
        auto-connect
      >
        <template #node-event="nodeProps">
          <EventNode
            :node="{ ...nodeProps }"
            :is-connecting="connectingNodeId === nodeProps.id"
          />
        </template>
        <Background />
        <Controls />
        <MiniMap />
      </VueFlow>
    </div>
    <ToolBar />
  </div>
</template>
