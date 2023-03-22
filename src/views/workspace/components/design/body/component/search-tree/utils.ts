import type { TreeNodeData } from '@arco-design/web-vue'

type Key = string | number

export const createTree = () => {}

export type TreeOperation = {
  type: 'create'
  key: Key
  data: TreeNodeData
} | {
  type: 'delete'
  key: Key
}

export const updateTree = (tree: TreeNodeData[], op: TreeOperation) => {
  let done = false

  const traverse = (node: TreeNodeData): TreeNodeData => {
    const newNode: TreeNodeData = { ...node, children: [] }
    if (!done && op.type === 'create' && op.key === node.key) {
      newNode.children!.push(op.data)
      done = true
    }

    for (const child of node.children ?? []) {
      if (!done && op.type === 'delete' && op.key === child.key) {
        done = true
        continue
      }

      newNode.children!.push(traverse(child))
    }

    return newNode
  }

  return [...tree].map(traverse)
}
