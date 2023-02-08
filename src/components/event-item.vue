<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { UnitIDRange } from '@project-chiral/unit-id'
import api from '@/api/api'
import type { EventEntity } from '@/api/api-base'
import emitter from '@/utils/emitter'
import Item from '@/components/item/index.vue'

const { id, height, button = false, eventSelect = false, animate } = defineProps<{
  id: number
  height?: number
  button?: boolean
  eventSelect?: boolean
  animate?: boolean | Record<string, any>
}>()

const emit = defineEmits<{
  (e: 'click', event: EventEntity): void
  (e: 'hover', event: EventEntity): void
}>()

const { data } = $(useQuery({
  queryKey: computed(() => ['event', id]),
  queryFn: () => api.event.getEvent(id),
}))
const range = $computed(() => data && UnitIDRange.deserialize(data.range))

const handleClick = async () => {
  if (!data) { return }
  emit('click', data)
  if (eventSelect) {
    emitter.emit('event-select', { event: data })
  }
}

const handleHover = () => {
  if (!data) { return }
  emit('hover', data)
}
</script>

<template>
  <Item
    :animate="animate"
    :button="button"
    :height="height"
    @click="handleClick"
    @hover="handleHover"
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
        {{ range?.start }} - {{ range?.end }}
      </div>
    </div>
    <template #extra>
      <slot name="extra" :event="data"></slot>
    </template>
  </Item>
</template>
