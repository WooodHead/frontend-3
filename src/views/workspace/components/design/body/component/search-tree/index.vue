<script setup lang="ts">
import type { TreeNodeData } from '@arco-design/web-vue'
import type { TreeRef } from '@/utils/types'

const { data, search, selectKey } = defineProps<{
  data: TreeNodeData[]
  search?: string
  selectKey?: string | number
}>()

const emit = defineEmits<{
  (e: 'create', sup: number): void
  (e: 'remove', key: number): void
  (e: 'update:select-key', key: number): void
}>()

const target = ref<TreeRef | null>(null)

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

const handleCreate = ({ key }: TreeNodeData) => {
  if (!key) { return }
  emit('create', key as number)
}

const handleRemove = (key: string | number) => {
  if (!key) { return }
  emit('remove', key as number)
}

const nowData = ref(data)
watch(
  () => ({ search, data }),
  ({ search, data }) => {
    if (!search) { nowData.value = data }
    else { nowData.value = filterTree(search, data) }
  },
)
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
      <AButtonGroup absolute right-2>
        <AButton
          size="mini" type="text"
          @click="handleCreate(nodeData)"
        >
          <template #icon>
            <div i-radix-icons-plus></div>
          </template>
        </AButton>
        <AButton
          size="mini" type="text"
          @click="handleRemove(nodeData)"
        >
          <template #icon>
            <div i-radix-icons-trash></div>
          </template>
        </AButton>
      </AButtonGroup>
    </template>
  </ATree>
</template>
