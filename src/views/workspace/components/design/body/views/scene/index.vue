<script setup lang="ts">
import type { TreeNodeData } from '@arco-design/web-vue'
import SearchTree from '../../component/search-tree/index.vue'

const key = ref()

const data = ref<TreeNodeData[]>([
  {
    title: '1',
    key: '1',
    children: [
      { title: '1-1', key: '1-1' },
      { title: '1-2', key: '1-2' },
      { title: '1-3', key: '1-3' },
      { title: '1-4', key: '1-4' },
      { title: '1-5', key: '1-5' },
    ],
  },
  { title: '2', key: '2' },
  { title: '3', key: '3' },
  { title: '4', key: '4' },
  { title: '5', key: '5' },
])
const searchText = ref<string>()
const debouncedSearchText = refDebounced(searchText, 300)
const selectKey = ref<string>()
</script>

<template>
  <ResizeLayout h-full>
    <template #side>
      <div p-2 border="b border-2">
        <AInput
          v-model="searchText"
          size="small"
          placeholder="搜索指定条目"
          allow-clear
        />
      </div>
      <div h-full overflow-y-auto>
        <SearchTree
          v-model:select-key="selectKey"
          v-model:data="data"
          :search="debouncedSearchText"
        />
      </div>
    </template>
    <div w-0 grow overflow-y-auto>
      <ContentEditor cover force-header />
    </div>
  </ResizeLayout>
</template>
