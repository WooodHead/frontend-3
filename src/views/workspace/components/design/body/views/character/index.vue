<script setup lang="ts">
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import type { AxiosError } from 'axios'
import api from '@/api/api'
import type { CharacterEntity } from '@/api/api-base'

const charaId = ref<number>()
const handleItemClick = ({ id }: CharacterEntity) => {
  charaId.value = id
}

const client = useQueryClient()

const { data } = useQuery({
  queryKey: ['character'],
  queryFn: () => api.character.getAll(),
})

const { mutateAsync } = useMutation({
  mutationFn: () => api.character.create({ name: '新角色' }),
  onSuccess: data => {
    client.setQueryData(
      ['character'],
      (oldData: CharacterEntity[] | undefined) => [...oldData ?? [], data])
  },
  onError: ({ message }: AxiosError) => {
    console.error(message)
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
  await mutateAsync()
}
</script>

<template>
  <ResizeLayout full>
    <template #side>
      <div center-x gap-1 p-2 border="b border-2">
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
          :id="id"
          :key="id" button
          @click="handleItemClick"
        />
      </div>
    </template>
    <div p-4 grow center-y overflow-y-auto>
      <div center-x gap-4 m-4>
        <AAvatar :size="48">
          慈欣
        </AAvatar>
        <div column>
          <div text="2xl text-1" font-semibold>
            刘慈欣
          </div>
          <div text="sm text-3">
            大刘、中国科幻第一人
          </div>
        </div>
      </div>
      <ADivider />
      <ACard w-full>
        <ACardMeta title="基本信息" />
        <ADescriptions
          mt-2
          :data="[
            {
              label: '姓名',
              value: '刘慈欣',
            },
          ]"
        />
      </ACard>
    </div>
  </ResizeLayout>
</template>
