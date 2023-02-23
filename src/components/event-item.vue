<script setup lang="ts">
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import type { AxiosError } from 'axios'
import api from '@/api/api'
import type { EventEntity } from '@/api/api-base'
import emitter from '@/utils/emitter'
import Item from '@/components/item/index.vue'
import { UnitIDRange } from '@/utils/unit-id'

const { id, height, button = false, eventSelect = false, removable, animate } = defineProps<{
  id: number
  height?: number
  button?: boolean
  eventSelect?: boolean
  removable?: boolean
  animate?: boolean | Record<string, any>
}>()

const emit = defineEmits<{
  (e: 'click', event: EventEntity): void
  (e: 'hover', event: EventEntity): void
}>()

const client = useQueryClient()

const { data } = useQuery({
  queryKey: computed(() => ['event', id]),
  queryFn: () => api.event.get(id),
  select: data => ({
    ...data,
    range: UnitIDRange.fromDayjs(data.unit, data.start, data.end),
  }),
})
const handleClick = async () => {
  if (!data.value) { return }
  emit('click', data.value)
  if (eventSelect) {
    emitter.emit('event-select', { event: data.value })
  }
}

const handleHover = () => {
  if (!data.value) { return }
  emit('hover', data.value)
}

const { mutateAsync } = useMutation({
  mutationFn: () => api.event.remove(id, { cascade: false }),
  onSuccess: events => {
    for (const event of events) {
      client.invalidateQueries(['event', event.id])
    }
    client.invalidateQueries(['event', 'range'])
  },
  onError: ({ message }: AxiosError) => {
    console.error(message)
  },
})
const handleRemove = async () => {
  await mutateAsync()
}
</script>

<template>
  <Item
    :animate="animate"
    :button="button"
    :height="height"
    :removable="removable"
    @click="handleClick"
    @hover="handleHover"
    @remove="handleRemove"
  >
    <div center min-w-20px shrink-0 p-2>
      <div
        :style="{ backgroundColor: data?.color ?? '#93c5fd' }"
        w-12px h-12px rounded-sm
      ></div>
    </div>
    <div grow column p-1 overflow-hidden>
      <div text="xs text-1" ellipsis>
        {{ data?.serial }}. {{ data?.name }}
      </div>
      <div text="xs text-3" ellipsis>
        {{ data?.range.start }} - {{ data?.range.end }}
      </div>
    </div>
    <template #extra>
      <slot name="extra" :event="data"></slot>
    </template>
  </Item>
</template>
