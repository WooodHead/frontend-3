<script setup lang="ts">
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import type { AxiosError } from 'axios'
import { Message } from '@arco-design/web-vue'
import { useStore } from '../../store'
import { selectEvent } from '@/api/event'
import api from '@/api/api'
import type { EventEntity } from '@/api/api-base'

const store = useStore()
const { eventId } = storeToRefs(store)

const name = ref('')

const client = useQueryClient()
const { data } = useQuery({
  enabled: computed(() => !!eventId.value),
  queryKey: computed(() => ['event', eventId.value]),
  queryFn: () => api.event.get(eventId.value!),
  select: selectEvent,
  onSuccess: data => {
    name.value = data.name
  },
})
const { mutateAsync: update, isLoading } = useMutation({
  mutationFn: ({ id }: { id: number }) => api.ai.updateEventName(id),
  onSuccess: (name, { id }) => {
    client.setQueryData<EventEntity>(['event', id], event => event && {
      ...event,
      name,
    })
  },
  onError: (e: AxiosError) => {
    Message.error(`生成失败：${e.message}`)
  },
})

const handleGenerate = async () => {
  if (!eventId.value) { return }
  await update({ id: eventId.value })
}
</script>

<template>
  <ACard title="事件名称" :bordered="false" :loading="isLoading">
    <template #extra>
      <ALink @click="handleGenerate">
        生成
      </ALink>
    </template>
    {{ data?.name }}
  </ACard>
</template>
