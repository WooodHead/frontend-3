<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { useStore } from '../../store'
import InfoModal from './info-modal.vue'
import { selectEvent } from '@/api/event'
import api from '@/api/api'

const store = useStore()
const { eventId } = storeToRefs(store)

const { data } = useQuery({
  enabled: computed(() => eventId.value !== undefined),
  queryKey: computed(() => ['event', eventId.value]),
  queryFn: () => api.event.get(eventId.value!),
  select: selectEvent,
})

const modalVisible = ref(false)
</script>

<template>
  <ACard title="基本信息" :bordered="false">
    <template #extra>
      <ALink
        :disabled="data?.done" type="text"
        @click="modalVisible = true"
      >
        编辑
      </ALink>
    </template>
    <ADescriptions
      :column="1"
      :data="data ? [
        { label: '类型', value: data.type },
        { label: '创建于', value: data.createdAt.toLocaleString() },
        { label: '最后更新于', value: data.updatedAt.toLocaleString() },
      ] : []"
    />
  </ACard>
  <InfoModal v-model:visible="modalVisible" />
</template>
