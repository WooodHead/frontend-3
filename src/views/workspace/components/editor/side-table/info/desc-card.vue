<script setup lang="ts">
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import type { AxiosError } from 'axios'
import { Message } from '@arco-design/web-vue'
import { useStore } from '../../store'
import api from '@/api/api'
import { selectEvent } from '@/api/event'
import type { EventEntity, SummarizeDescDto } from '@/api/api-base'

const store = useStore()
const { eventId } = storeToRefs(store)

const { data } = useQuery({
  enabled: computed(() => !!eventId.value),
  queryKey: computed(() => ['event', eventId.value]),
  queryFn: () => api.event.get(eventId.value!),
  select: selectEvent,
})

const client = useQueryClient()
const { mutateAsync: updateDesc, isLoading } = useMutation({
  mutationFn: ({ id, ...dto }: SummarizeDescDto & { id: number }) => api.ai.updateEventDesc(id, dto),
  onSuccess: (description, { id }) => {
    client.setQueryData<EventEntity>(['event', id], event => event && ({
      ...event,
      description,
    }))
  },
  onError: (e: AxiosError) => {
    Message.error(`生成失败：${e.message}`)
  },
})

const handleGenerate = async () => {
  if (!eventId.value) { return }
  await updateDesc({ id: eventId.value })
}
</script>

<template>
  <ACard title="简介" :loading="isLoading" :bordered="false">
    <template #extra>
      <ALink @click="handleGenerate">
        生成
      </ALink>
    </template>
    <div prose leading-6>
      {{ data?.description }}
    </div>
  </ACard>
</template>
