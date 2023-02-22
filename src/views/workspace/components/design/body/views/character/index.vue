<script setup lang="ts">
import type { CharacterEntity } from '@/api/api-base'

const charaId = ref<number>()
const handleItemClick = ({ id }: CharacterEntity) => {
  charaId.value = id
}

const searchText = ref<string>()
</script>

<template>
  <ResizeLayout full>
    <template #side>
      <div p-2 border="b border-2">
        <AInputSearch
          v-model="searchText"
          size="small"
          placeholder="搜索角色"
          allow-clear
        />
      </div>
      <CharaItem :id="3" button @click="handleItemClick" />
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
