<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import DetailCard from './detail-card/index.vue'
import { useRelationsQuery } from '@/api/graph'
import { selectEvent } from '@/api/event'
import { EVENT } from '@/api/graph/schema'
import api from '@/api/api'

const { id, show = true, load = true } = defineProps<{
  id: number
  show?: boolean
  load?: boolean
}>()

const { data, isSuccess, isLoading, isError } = useQuery({
  enabled: computed(() => load),
  queryKey: computed(() => ['event', id]),
  queryFn: () => api.event.get(id),
  select: data => ({
    ...selectEvent(data),
    description: (data.description) ? data.description : '暂无',
  }),
})

const { data: relations } = useRelationsQuery({ type: EVENT, id })

const sups = computed(() => relations.value?.INCLUDES?.from ?? [])
const subs = computed(() => relations.value?.INCLUDES?.to ?? [])
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
    <div>
      <h4>参与角色</h4>
      <CharaBadgeTable :event-id="id" :editable="false" />
    </div>
    <div center-x justify-between>
      <h4>父事件</h4>
    </div>
    <div
      v-if="sups.length ?? 0 > 0"
      border="~ border-2" rounded
      max-h-200px overflow-y-auto
    >
      <EventItem
        v-for="supId in sups"
        :id="supId" :key="supId"
        button
      />
    </div>
    <div center-x justify-between>
      <h4>子事件</h4>
    </div>
    <div
      v-if="subs.length ?? 0 > 0"
      border="~ border-2" rounded
      max-h-200px overflow-y-auto
    >
      <EventItem
        v-for="subId in subs"
        :id="subId" :key="subId"
        button
      />
    </div>
  </DetailCard>
</template>
