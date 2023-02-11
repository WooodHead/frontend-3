import { useVueFlow } from '@vue-flow/core'
import type { SimulationLinkDatum, SimulationNodeDatum } from 'd3-force'
import { forceCenter, forceCollide, forceLink, forceManyBody, forceSimulation } from 'd3-force'

interface UseForceLayoutConfig {
  forceCenterPosition?: { x: number; y: number }
}

/**
 * 通过d3-force实现节点的力导向布局
 *
 * 大致思路为：d3-force中的`simulation.nodes()`中包含所有模拟节点，vue-flow的`nodes`中包含所有实际节点，通过各种监听实现双方的双向绑定。
 * @param nodes flow中的节点
 * @param edges flow中的边
 * @param configs  配置项
 */
export const useForceLayout = (
  configs?: UseForceLayoutConfig) => {
  const { forceCenterPosition } = configs ?? {}

  const { onNodeDrag, nodes, edges } = useVueFlow()

  // d3-force以index作为节点的唯一标识，所以需要将节点的id和index实时对应起来
  const indexLookup = ref(new Map<string, number>())

  const sim = forceSimulation()
    .force('charge', forceManyBody().strength(10))
    .force('collide', forceCollide().radius(50))

  if (forceCenterPosition) {
    sim.force('center', forceCenter(forceCenterPosition.x, forceCenterPosition.y))
  }

  // 每tick根据simNodes更新nodes位置
  sim.on('tick', () => {
    for (const { index, x, y } of sim.nodes()) {
      const node = nodes.value[index!]
      node.position.x = x!
      node.position.y = y!
    }
  })

  // 边更新的监听
  watch(edges, () => {
    const simEdges: SimulationLinkDatum<SimulationNodeDatum>[] = []

    for (const edge of edges.value) {
      const source = indexLookup.value.get(edge.source)
      const target = indexLookup.value.get(edge.target)
      if (source && target) {
        simEdges.push({
          source,
          target,
        })
      }
    }

    sim.force('link', forceLink(simEdges))
  })

  // 节点更新的监听
  // 如果节点在更新前已经存在，则继承其对应的模拟节点的；否则新建模拟节点
  watch(() => nodes.value.length, length => {
    const simNodes = sim.nodes()
    const newSimNodes: SimulationNodeDatum[] = Array.from({ length })

    for (const [newIndex, node] of nodes.value.entries()) {
      const oldIndex = indexLookup.value.get(node.id)
      if (oldIndex) {
        const simNode = simNodes[oldIndex]
        simNode.index = newIndex
        newSimNodes[newIndex] = simNode
      }
      else {
        newSimNodes[newIndex] = {
          index: newIndex,
          x: node.position.x,
          y: node.position.y,
        }
      }
    }

    sim.nodes(newSimNodes)
    indexLookup.value = new Map(nodes.value.map(({ id }, index) => [id, index]))
  })

  // 节点拖拽的监听
  onNodeDrag(({ node }) => {
    const index = indexLookup.value.get(node.id)!

    const simNodes = sim.nodes()
    const simNode = simNodes[index]

    simNode.x = node.position.x
    simNode.y = node.position.y
    simNode.vx = 0
    simNode.vy = 0
    simNode.fx = node.position.x
    simNode.fy = node.position.y

    // sim.alpha(1).restart()
  })
}

export default useForceLayout
