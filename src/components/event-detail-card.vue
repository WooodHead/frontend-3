<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import DetailCard from './detail-card/index.vue'
import { UnitIDRange } from '@/utils/unit-id'
import api from '@/api/api'

const { id, show = true, load = true } = defineProps<{
  id: number
  show?: boolean
  load?: boolean
}>()

const charas = ref({
  resolved: [] as number[],
  unresolved: [] as string[],
})

const { data, isSuccess, isLoading, isError } = useQuery({
  enabled: computed(() => load),
  queryKey: computed(() => ['event', id, 'detail']),
  queryFn: () => api.event.getDetail(id),
  select: data => ({
    ...data,
    type: data.type === 'ATOM' ? '原子事件' : '集合事件',
    createdAt: new Date(data.createdAt),
    updatedAt: new Date(data.updatedAt),
    range: UnitIDRange.fromDayjs(data.unit, data.start, data.end),
  }),
})
watch(data, data => {
  if (!data) { return }
  charas.value.resolved.push(...data.characters)
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
    <div>
      <h4>参与角色</h4>
      <CharaBadgeTable v-model="charas" :event-id="id" />
    </div>
    <div center-x justify-between>
      <h4>父事件</h4>
      <AButton type="text">
        <template #icon>
          <div i-radix-icons-plus></div>
        </template>
      </AButton>
    </div>
    <div
      v-if="data?.sups.length ?? 0 > 0"
      border="~ border-2" rounded
      max-h-200px overflow-y-auto
    >
      <EventItem
        v-for="supId in data?.sups"
        :id="supId" :key="supId"
        button
      />
    </div>
    <div center-x justify-between>
      <h4>子事件</h4>
      <AButton type="text">
        <template #icon>
          <div i-radix-icons-plus></div>
        </template>
      </AButton>
    </div>
    <div
      v-if="data?.subs.length ?? 0 > 0"
      border="~ border-2" rounded
      max-h-200px overflow-y-auto
    >
      <EventItem
        v-for="subId in data?.subs"
        :id="subId" :key="subId"
        button
      />
    </div>
  </DetailCard>
</template>
