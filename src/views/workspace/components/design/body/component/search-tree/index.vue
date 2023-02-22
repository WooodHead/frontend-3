<script setup lang="ts">
import type { Tree, TreeNodeData } from '@arco-design/web-vue'

const { data, search, selectKey } = defineProps<{
  data: TreeNodeData[]
  search?: string
  selectKey?: string | number
}>()

const emit = defineEmits<{
  (e: 'update:data', data: TreeNodeData[]): void
  (e: 'update:select-key', key: string | number): void
}>()

const target = ref<InstanceType<typeof Tree> | null>(null)

const filterTree = (text: string, data: TreeNodeData[]): TreeNodeData[] => {
  text = text.toLowerCase()
  const result: TreeNodeData[] = []
  for (const node of data) {
    if (node.title?.toLowerCase().includes(text)) {
      result.push({ ...node })
    }
    else if (node.children) {
      const filteredChildren = filterTree(text, node.children)
      if (filteredChildren.length) {
        result.push({ ...node, children: filteredChildren })
      }
    }
  }

  return result
}

const handleAddItem = (nodeData: TreeNodeData) => {
  const children = nodeData.children || []
  children.push({
    title: 'new tree node',
    key: `${nodeData.key}-${children.length + 1}`,
  })
  nodeData.children = children
}

const nowData = ref(data)
watchEffect(() => {
  if (!search) { nowData.value = data }
  else { nowData.value = filterTree(search, data) }
})
</script>

<template>
  <ATree
    ref="target"
    show-line
    default-expand-all
    :selectable="(_node, { isLeaf }) => isLeaf"
    :data="nowData"
    :selected-keys="selectKey ? [selectKey] : []"
    @update:selected-keys="$emit('update:select-key', $event[0])"
  >
    <template #extra="nodeData">
      <AButton
        size="small" type="text"
        absolute right-2
        @click="handleAddItem(nodeData)"
      >
        <template #icon>
          <div i-radix-icons-plus></div>
        </template>
      </AButton>
    </template>
  </ATree>
</template>
