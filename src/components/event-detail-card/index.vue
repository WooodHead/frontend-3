<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { Motion, Presence } from '@motionone/vue'
import { UnitIDRange } from '@project-chiral/unit-id'
import api from '@/api/api'
import { fadeInOut } from '@/utils/animation'

const { id, show = true, enabled = true } = defineProps<{
  id: number
  show?: boolean
  enabled?: boolean
}>()

const { data, isSuccess, isLoading, isError } = $(useQuery({
  enabled: computed(() => enabled),
  queryKey: computed(() => ['event', id, 'detail']),
  queryFn: () => api.event.getEventDetail(id),
  select: data => ({
    ...data,
    type: data.type === 'ATOM' ? '原子事件' : '集合事件',
    createdAt: new Date(data.createdAt),
    updatedAt: new Date(data.updatedAt),
    range: UnitIDRange.deserialize(data.range),
  }),
}))
</script>

<template>
  <Presence>
    <Motion v-if="show" v-bind="fadeInOut">
      <Status
        v-if="!isSuccess"
        w-300px h-400px card
        :loading="isLoading"
        :error="isError"
      />
      <ACard
        v-else
        card
        w-300px max-h-400px
        overflow-y-auto
        prose text-sm
        @wheel.stop
      >
        <template #cover>
          <div h-102px overflow-hidden>
            <img
              :style="{ width: '100%', transform: 'translateY(-50px)' }"
              alt="dessert"
              src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a20012a2d4d5b9db43dfc6a01fe508c0.png~tplv-uwbnlip3yd-webp.webp"
            >
          </div>
        </template>
        <ACardMeta :title="`${data?.serial}: ${data?.name}`" />
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
        <h4>事件简介</h4>
        {{ data?.description }}
        <ADivider />
        <h4>父事件</h4>
        <div border="~ border-2" grid="~ cols-2" gap-0 max-h-200px overflow-y-auto>
          <EventDetailItem :id="id" />
          <EventDetailItem :id="id" />
          <EventDetailItem :id="id" />
        </div>
        <h4>子事件</h4>
        <div border="~ border-2" grid="~ cols-2" gap-0 max-h-200px overflow-y-auto>
          <EventDetailItem :id="id" />
          <EventDetailItem :id="id" />
          <EventDetailItem :id="id" />
        </div>
      </ACard>
    </Motion>
  </Presence>
</template>
