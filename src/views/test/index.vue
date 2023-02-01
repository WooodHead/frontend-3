<script setup lang="ts">
import type { Edge, Node } from '@vue-flow/core'
import { useVueFlow } from '@vue-flow/core'
import type { SimulationLinkDatum, SimulationNodeDatum } from 'd3-force'
import { forceCenter, forceLink, forceManyBody, forceSimulation } from 'd3-force'
import type { UnitTimePickerValue } from '@/components/unit-time-picker.vue'

const { onNodeDrag } = $(useVueFlow())

let nodes = $ref<Node[]>([])
const edges = $ref<Edge[]>([])

onMounted(() => {
  nodes = Array(20).fill(0).map((_, i) => ({
    id: `${i}`,
    position: { x: Math.random() * 100, y: Math.random() * 100 },
    label: `Node ${i}`,
  }))

  edges.push(...Array(19).fill(0).map((_, i) => ({
    id: `${i}_${i + 1}`,
    type: 'straight',
    source: `${i}`,
    target: `${i + 1}`,
  })))
})

let indexLookup = $ref(new Map<string, number>())

const sim = forceSimulation()
  .nodes(Array.from({ length: 10 }, () => ({})))
  .force('charge', forceManyBody().strength(-5))
  .force('link', forceLink([]))
  .force('center', forceCenter(1000, 1000))

// 每个tick根据sim模拟的结果更新flow中节点的位置
sim.on('tick', () => {
  for (const { index, x, y } of sim.nodes()) {
    const node = nodes[index!]
    node.position.x = x!
    node.position.y = y!
  }
})

// 边更新的监听
watch($$(edges), () => {
  const simEdges: SimulationLinkDatum<SimulationNodeDatum>[] = []

  for (const edge of edges) {
    const source = indexLookup.get(edge.source)
    const target = indexLookup.get(edge.target)
    if (source && target) {
      simEdges.push({
        source,
        target,
      })
    }
  }

  sim.force('link', forceLink(simEdges).distance(100))
})

// 节点增减的监听
watch(
  () => nodes.length,
  () => {
    const simNodes = sim.nodes()
    const newSimNodes: SimulationNodeDatum[] = Array.from({ length: nodes.length })

    for (const [newIndex, node] of nodes.entries()) {
      const oldIndex = indexLookup.get(node.id)
      if (oldIndex) {
        const simNode = simNodes[oldIndex]
        simNode.index = newIndex
        newSimNodes[newIndex] = simNode
      }
      else {
        newSimNodes[newIndex] = {
          index: newIndex,
          x: 0,
          y: 0,
        }
      }
    }

    sim.nodes(newSimNodes)
    indexLookup = new Map(nodes.map(({ id }, index) => [id, index]))
  },
)

// 节点拖拽的监听
onNodeDrag(({ node }) => {
  const index = indexLookup.get(node.id)!
  const simNodes = sim.nodes()
  const simNode = simNodes[index]

  simNode.x = node.position.x
  simNode.y = node.position.y
  simNode.vx = 0
  simNode.vy = 0

  sim.alpha(1).restart()
})

const model = $ref({
  time: {
    unit: 'month',
    time: new Date(),
  } as UnitTimePickerValue,
})
</script>

<template>
  <div w-screen h-screen center bg-gray-2>
    <div card center w-3-4 h-3-4>
      <div w="75%">
        <EventDetailCard :id="1" />
      </div>
    </div>
  </div>
</template>
