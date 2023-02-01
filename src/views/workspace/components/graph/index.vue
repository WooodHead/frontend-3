<script setup lang="ts">
import type { Edge, Node } from '@vue-flow/core'
import { VueFlow, useVueFlow } from '@vue-flow/core'
import { Background, Controls, MiniMap } from '@vue-flow/additional-components'
import type { ComponentStatus } from '../type'
import { IPositionState } from '../../layout'
import EventNode from './event-node/index.vue'
import ToolBar from './tool-bar/index.vue'
import { registerStore } from './store'

interface GraphProps {
  status: ComponentStatus
}

const { status } = defineProps<GraphProps>()

const store = registerStore(status.positionId)
watch(
  () => status,
  status => { store.status = status },
  { deep: true },
)

let nodes = $ref<Node[]>([])
const edges = $ref<Edge[]>([])
const { nodes: graphNodes, onConnectStart, onConnectEnd, addSelectedNodes, removeSelectedNodes, fitView } = $(useVueFlow())
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

watch(() => status.position, () => { fitView() })

const showMiniMap = $computed(() => ![IPositionState.Corner, IPositionState.Vertical].includes(status.state ?? -1))
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
        <MiniMap v-if="showMiniMap" />
      </VueFlow>
    </div>
    <ToolBar :id="status.positionId" />
  </div>
</template>
