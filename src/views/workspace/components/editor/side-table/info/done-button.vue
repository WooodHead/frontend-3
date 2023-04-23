<script setup lang="ts">
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { Message } from '@arco-design/web-vue'
import { useStore } from '../../store'
import api from '@/api/api'
import type { ApiError } from '@/api/types'

const store = useStore()
const { eventId, todoDot, relationDot } = storeToRefs(store)

const { data } = useQuery({
  enabled: computed(() => eventId.value !== undefined),
  queryKey: computed(() => ['event', eventId.value]),
  queryFn: () => api.event.get(eventId.value!),
})

const client = useQueryClient()
const { mutateAsync: toggleDone } = useMutation({
  mutationFn: ({ id, done }: { id: number; done: boolean }) =>
    api.event.toggleDone(id, { done }),
  onSuccess: (event) => {
    client.setQueryData(['event', event.id], event)
  },
  onError: (e: ApiError) => {
    Message.error(`操作失败：${e.response?.data.message}`)
  },
})

const disabled = computed(() =>
  Boolean(
    todoDot.value ||
      relationDot.value ||
      !data.value?.name ||
      !data.value?.description
  )
)

const config = computed(() =>
  data.value?.done
    ? ({
        type: 'primary',
        icon: 'i-radix-icons-check-circled',
        text: '已完成',
      } as const)
    : ({
        type: 'secondary',
        icon: 'i-radix-icons-circle',
        text: '未完成',
      } as const)
)

const handleToggleDone = async () => {
  if (!data.value || !eventId.value) {
    return
  }
  await toggleDone({ id: eventId.value, done: !data.value.done })
}
</script>

<template>
  <AButton :type="config.type" :disabled="disabled" @click="handleToggleDone">
    <template #icon>
      <div :class="config.icon"></div>
    </template>
    {{ config.text }}
  </AButton>
</template>
