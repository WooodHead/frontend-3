<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { UnitIDRange } from '@project-chiral/unit-id'
import DetailCard from './detail-card/index.vue'
import api from '@/api/api'

const { id, show = true, load = true } = defineProps<{
  id: number
  show?: boolean
  load?: boolean
}>()

const { data, isSuccess, isLoading, isError } = useQuery({
  enabled: computed(() => load),
  queryKey: computed(() => ['event', id, 'detail']),
  queryFn: () => api.event.getEventDetail(id),
  select: data => ({
    ...data,
    type: data.type === 'ATOM' ? '原子事件' : '集合事件',
    createdAt: new Date(data.createdAt),
    updatedAt: new Date(data.updatedAt),
    range: UnitIDRange.deserialize(data.range),
  }),
})
</script>

<template>
  <DetailCard
    :show="show"
    :title="`${data?.serial}. ${data?.name}`"
    :success="isSuccess"
    :loading="isLoading"
    :error="isError"
  >
    <div text-xs text-gray-6 mt-2>
      创建于 {{ `${data?.createdAt.toLocaleDateString()} ${data?.createdAt.toLocaleTimeString()}` }}
      <br>
      最后更新于 {{ `${data?.updatedAt.toLocaleDateString()} ${data?.updatedAt.toLocaleTimeString()}` }}
    </div>
    <ADescriptions :column="1">
      <ADescriptionsItem label="时间">
        {{ data?.range.start.toString() }} 至 {{ data?.range.end.toString() }}
      </ADescriptionsItem>
      <ADescriptionsItem label="类型">
        {{ data?.type }}
      </ADescriptionsItem>
    </ADescriptions>
    <ADivider />
    <h4 text-center>
      事件简介
    </h4>
    {{ data?.description }}
    <ADivider />
    <div center-x justify-between>
      <h4>父事件</h4>
      <AButton>添加</AButton>
    </div>
    <div border="~ border-2" max-h-200px overflow-y-auto rounded>
      <EventItem :id="id" button />
      <EventItem :id="id" button />
    </div>
    <div center-x justify-between>
      <h4>子事件</h4>
      <AButton>添加</AButton>
    </div>
    <div border="~ border-2" max-h-200px overflow-y-auto rounded>
      <EventItem :id="id" button />
      <EventItem :id="id" button />
    </div>
  </DetailCard>
</template>
