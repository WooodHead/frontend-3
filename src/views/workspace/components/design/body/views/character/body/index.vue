<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import InfoModal from './info-modal.vue'
import api from '@/api/api'

const { id } = defineProps<{
  id?: number
}>()
const { data, isSuccess, isLoading, isError } = useQuery({
  enabled: computed(() => id !== undefined),
  queryKey: computed(() => ['character', id]),
  queryFn: () => api.character.get(id!),
})

const modalVisible = ref(false)
</script>

<template>
  <Status v-if="!isSuccess" :empty="id === undefined" :loading="isLoading" :error="isError" />
  <div v-else p-4 center-y gap-2 overflow-y-auto>
    <div center-x gap-4 m-4>
      <AAvatar :size="48">
        {{ data?.name.slice(-2) }}
      </AAvatar>
      <div column>
        <div text="2xl text-1" font-semibold>
          {{ data?.name }}
        </div>
        <div text="sm text-3">
          {{ data?.alias.join(', ') }}
        </div>
      </div>
    </div>
    <ADivider />
    <ACard title="基本信息" w-full>
      <template #extra>
        <ALink @click="modalVisible = true">
          编辑
        </ALink>
      </template>
      <ADescriptions
        mt-2
        :data="[
          {
            label: '姓名',
            value: data?.name ?? '',
          },
        ]"
      />
    </ACard>
    <ACard w-full title="人物简介">
      <template #extra>
        <AButton type="text" size="small">
          <template #icon>
            <div i-radix-icons-pencil-2 text-lg></div>
          </template>
        </AButton>
      </template>
    </ACard>
  </div>
  <InfoModal
    v-if="id" :id="id"
    v-model:visible="modalVisible"
  />
</template>
