<script setup lang="ts">
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import type { AxiosError } from 'axios'
import { Message } from '@arco-design/web-vue'
import { useStore } from '../../store'
import InfoModal from './info-modal.vue'
import api from '@/api/api'
import { UnitID } from '@/utils/unit-id'

const store = useStore()
const { eventId } = storeToRefs(store)

const client = useQueryClient()

const { data: event } = useQuery({
  enabled: computed(() => eventId.value !== undefined),
  queryKey: computed(() => ['event', eventId.value]),
  queryFn: () => api.event.get(eventId.value!),
  select: data => ({
    ...data,
    name: `${data.serial}. ${data.name}`,
    range: `${UnitID.fromDayjs(data.unit, data.start).toString()} - ${UnitID.fromDayjs(data.unit, data.end).toString()}`,
  }),
})

const { mutateAsync: remove, isLoading } = useMutation({
  mutationFn: ({ id }: { id: number }) => api.event.remove(id, { cascade: false }),
  onSuccess: events => {
    for (const event of events) {
      client.invalidateQueries(['event', event.id])
    }
    client.invalidateQueries(['event', 'range'])
  },
  onError: ({ message }: AxiosError) => {
    Message.error(`删除事件失败: ${message}`)
  },
})
const handleRemove = async () => {
  if (eventId.value === undefined) { return }
  await remove({ id: eventId.value })
  store.eventId = undefined
}

const visible = ref(false)
</script>

<template>
  <div nim-column gap-2>
    <div center-x gap-1>
      <AButton grow @click="visible = true">
        修改
      </AButton>
      <LongPressButton
        :loading="isLoading" status="danger"
        shrink-0
        @press="handleRemove"
      >
        <template #icon>
          <div i-radix-icons-trash></div>
        </template>
      </LongPressButton>
    </div>
    <InfoModal v-model:visible="visible" />
    <ACard title="基本信息">
      <ADescriptions
        :column="1"
        :data="event ? [
          { label: '名称', value: event.name },
          { label: '类型', value: event.type },
          { label: '时间', value: event.range },
        ] : []"
      />
    </ACard>
    <ACard v-if="event?.description" title="简介">
      {{ event.description }}
    </ACard>
  </div>
</template>
