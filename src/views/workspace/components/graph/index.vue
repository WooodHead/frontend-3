<script setup lang="ts">
import type { Edge, Node } from '@vue-flow/core'
import { VueFlow, useVueFlow } from '@vue-flow/core'
import { Background, Controls, MiniMap } from '@vue-flow/additional-components'
import type { ComponentStatus } from '../type'
import { IPositionState } from '../../layout'
import EventNode from './node/event-node/index.vue'
import CharaNode from './node/chara-node/index.vue'
import ToolBar from './tool-bar/index.vue'
import { registerStore } from './store'

interface GraphProps {
  status: ComponentStatus
}

const { status } = defineProps<GraphProps>()

const store = registerStore(status.positionId)
watch(() => status, status => {
  store.status = status
}, { deep: true })

const nodes = reactive<Node[]>([])
const edges = reactive<Edge[]>([])
const { nodes: graphNodes, onConnectStart, onConnectEnd, addSelectedNodes, removeSelectedNodes, fitView } = useVueFlow()
// useForceLayout()

onMounted(() => {
  nodes.push(...Array(2).fill(0).map((_, i) => ({
    id: `${i}`,
    type: 'event',
    position: { x: i * 200, y: 0 },
    label: `Node ${i}`,
  })))

  nodes.push(...Array(2).fill(0).map((_, i) => ({
    id: `Chara_${i}`,
    type: 'chara',
    position: { x: (i + 2) * 200, y: 0 },
    label: `Chara ${i}`,
  })))

  // edges.push(...Array(19).fill(0).map((_, i) => ({
  //   id: `${i}_${i + 1}`,
  //   source: `${i}`,
  //   target: `${i + 1}`,
  //   updateable: true,
  // })))
})

const connectingNodeId = ref<string>()
onConnectStart(({ nodeId }) => {
  connectingNodeId.value = nodeId
  addSelectedNodes(graphNodes.value.filter(({ id }) => id === nodeId))
})
onConnectEnd(() => {
  connectingNodeId.value = undefined
  removeSelectedNodes(graphNodes.value.filter(({ id }) => id === connectingNodeId.value))
})

watch(() => status.position, () => { fitView() })

const showMiniMap = computed(() => ![IPositionState.Corner, IPositionState.Vertical].includes(status.state ?? -1))
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
        <template #node-chara="nodeProps">
          <CharaNode
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
