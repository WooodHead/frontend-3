<script setup lang="ts">
import { useQuery, useQueryClient } from '@tanstack/vue-query'
import type { AxiosError } from 'axios'
import { Message } from '@arco-design/web-vue'
import Body from './body/index.vue'
import api from '@/api/api'
import type { CharaEntity } from '@/api/api-base'
import { useCharaCreate } from '@/api/chara'

const charaId = ref<number>()

const client = useQueryClient()
const { data } = useQuery({
  queryKey: ['chara', 'list'],
  queryFn: () => api.chara.getAll(),
  onSuccess: charas => {
    for (const chara of charas) {
      client.setQueryData(['chara', chara.id], chara)
    }
  },
  onError: ({ message }: AxiosError) => {
    Message.error(`获取角色列表失败: ${message}`)
  },
})

const { mutate: create, isLoading: createLoading } = useCharaCreate()

const list = ref<CharaEntity[]>([])
const searchText = ref<string>()
const debouncedSearchText = debouncedRef(searchText, 300)
watchEffect(() => {
  const search = debouncedSearchText.value
  const rawData = data.value ?? []
  list.value = search
    ? rawData.filter(({ name }) => name.includes(search))
    : rawData
})
</script>

<template>
  <ResizeLayout full>
    <template #side>
      <div
        center-x gap-1
        p-2 border="b border-2"
      >
        <div row grow gap-1>
          <AInput
            v-model="searchText"
            grow size="small"
            placeholder="搜索角色"
            allow-clear
          />
          <AButton shrink-0>
            <template #icon>
              <div i-radix-icons-mixer-horizontal text-lg></div>
            </template>
          </AButton>
        </div>
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
          @click="charaId = id"
          @remove="charaId === id && (charaId = undefined)"
        />
      </div>
    </template>
    <div w-0 grow overflow-y-auto>
      <Body :id="charaId" />
    </div>
  </ResizeLayout>
</template>
