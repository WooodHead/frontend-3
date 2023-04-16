<script setup lang="ts">
import { useQueryClient } from '@tanstack/vue-query'
import SearchTree from '../../component/search-tree/index.vue'
import { useWorldviewCreate, useWorldviewQuery, useWorldviewRemove } from './query'
import api from '@/api/api'

const { data } = useWorldviewQuery()
const { mutateAsync: create } = useWorldviewCreate()
const { mutateAsync: remove } = useWorldviewRemove()

const client = useQueryClient()
const handleCreate = async (sup?: number) => {
  let path = ''

  if (sup) {
    const { id, path: supPath } = await client.ensureQueryData({
      queryKey: ['worldview', sup],
      queryFn: () => api.worldview.get(sup),
    })
    path = `${supPath}/${id}`
  }

  await create({
    name: '新条目',
    path,
  })
}

const handleRemove = async (id: number) => {
  await remove({ id })
}

const searchText = ref<string>()
const debouncedSearchText = refDebounced(searchText, 300)
const selectKey = ref<string>()
</script>

<template>
  <ResizeLayout h-full>
    <template #side>
      <div row gap-1 p-2 border="b border-2">
        <AInput
          v-model="searchText"
          grow
          size="small"
          placeholder="搜索指定条目"
          allow-clear
        />
        <AButton
          shrink-0
          title="创建新条目" shape="square"
          type="outline"
          @click="handleCreate()"
        >
          <template #icon>
            <div i-radix-icons-plus />
          </template>
        </AButton>
      </div>
      <div h-full overflow-y-auto>
        <SearchTree
          v-model:select-key="selectKey"
          :data="data ?? []"
          :search="debouncedSearchText"
          @remove="handleRemove"
          @create="handleCreate"
        />
      </div>
    </template>
    <div column grow>
      <ContentEditor full force-header cover placeholder="在这里写下设定" />
    </div>
  </ResizeLayout>
</template>
