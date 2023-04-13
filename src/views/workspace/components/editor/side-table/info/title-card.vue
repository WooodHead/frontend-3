<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { useStore } from '../../store'
import { useUpdateName } from '../query'
import { selectEvent } from '@/api/event'
import api from '@/api/api'

const store = useStore()
const { eventId } = storeToRefs(store)

const name = ref('')

const { data } = useQuery({
  enabled: computed(() => eventId.value !== undefined),
  queryKey: computed(() => ['event', eventId.value]),
  queryFn: () => api.event.get(eventId.value!),
  select: selectEvent,
  onSuccess: data => {
    name.value = data.name
  },
})

const { mutateAsync: update, isLoading } = useUpdateName()

const handleGenerate = async () => {
  if (!eventId.value) { return }
  await update({ id: eventId.value })
}
</script>

<template>
  <ACard title="事件名称" :bordered="false" :loading="isLoading">
    <template #extra>
      <ALink
        :disabled="data?.done"
        @click="handleGenerate"
      >
        生成
      </ALink>
    </template>
    {{ data?.name }}
  </ACard>
</template>
