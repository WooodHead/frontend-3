<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import Body from './body/index.vue'
import api from '@/api/api'
import type { CharacterEntity } from '@/api/api-base'
import { useCharaCreate } from '@/api/character'

const charaId = ref<number>()
const handleClick = ({ id }: CharacterEntity) => {
  charaId.value = id
}

// TODO 改为useInfiniteQuery
const { data } = useQuery({
  queryKey: ['character', 'list'],
  queryFn: () => api.character.getAll(),
})

const { mutate: create, isLoading: createLoading } = useCharaCreate()

const list = ref<CharacterEntity[]>([])
const searchText = ref<string>()
const debouncedSearchText = debouncedRef(searchText, 300)
watchEffect(() => {
  const search = debouncedSearchText.value
  const rawData = data.value ?? []
  list.value = search
    ? rawData.filter(({ name }) => name.includes(search))
    : rawData
})

const handleDelete = async ({ id }: CharacterEntity) => {
  if (charaId.value === id) {
    charaId.value = undefined
  }
}
</script>

<template>
  <ResizeLayout full>
    <template #side>
      <div
        center-x gap-1
        p-2 border="b border-2"
      >
        <AInput
          v-model="searchText"
          size="small"
          placeholder="搜索角色"
          allow-clear
        />
        <AButton
          title="创建新角色"
          size="small" type="outline"
          shrink-0
          :loading="createLoading"
          @click="create({ name: '新角色' })"
        >
          <template #icon>
            <div i-radix-icons-plus text-lg></div>
          </template>
        </AButton>
      </div>
      <div h-0 grow overflow-y-auto>
        <CharaItem
          v-for="{ id } of list"
          :id="id" :key="id"
          button removable
          @click="handleClick"
          @remove="handleDelete"
        />
      </div>
    </template>
    <Body :id="charaId" />
  </ResizeLayout>
</template>
