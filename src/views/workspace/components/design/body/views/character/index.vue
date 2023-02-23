<script setup lang="ts">
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import type { AxiosError } from 'axios'
import { Message } from '@arco-design/web-vue'
import Body from './body/index.vue'
import api from '@/api/api'
import type { CharacterEntity } from '@/api/api-base'

const charaId = ref<number>()
const handleClick = ({ id }: CharacterEntity) => {
  charaId.value = id
}

const client = useQueryClient()

const { data } = useQuery({
  queryKey: ['character'],
  queryFn: () => api.character.getAll(),
})

const { mutateAsync: create, isLoading } = useMutation({
  mutationFn: () => api.character.create({ name: '新角色' }),
  onSuccess: data => {
    if (charaId.value === undefined) { charaId.value = data.id }
    client.setQueryData(
      ['character'],
      (oldData: CharacterEntity[] | undefined) =>
        [...oldData ?? [], data],
    )
  },
  onError: ({ message }: AxiosError) => {
    Message.error(`创建角色失败: ${message}`)
  },
})

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

const handleCreate = async () => {
  await create()
}

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
          :loading="isLoading"
          @click="handleCreate"
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
