import type { TreeNodeData } from '@arco-design/web-vue'

export interface TreeNode {
  id: number
  path: string
  name?: string
}

export const toTree = (nodes: TreeNode[]): TreeNodeData[] => {
  const lookup = new Map<number, TreeNodeData>()

  for (const { id, path, name } of nodes) {
    const paths = path.split('/').filter(Boolean).map(parseInt)
    for (const key of paths.concat(id)) {
      if (lookup.has(key)) { continue }
      lookup.set(key, { key, title: name, children: [] })
    }
    if (!paths.length) { continue }
    const sup = paths[paths.length - 1]
    const node = lookup.get(id)!
    const supNode = lookup.get(sup)!
    supNode.children!.push(node)
  }

  return nodes
    .filter(({ path }) => path === '')
    .map(({ id }) => lookup.get(id)!)
}
