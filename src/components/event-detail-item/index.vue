<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { UnitIDRange } from '@project-chiral/unit-id'
import { Button } from '@arco-design/web-vue'
import api from '@/api/api'
import type { EventEntity } from '@/api/api-base'
import emitter from '@/utils/emitter'

const { id, height = 40, button = true, eventSelect = false } = defineProps<{
  id: number
  data?: EventEntity
  height?: number
  button?: boolean
  eventSelect?: boolean
}>()

const emit = defineEmits<{
  (e: 'click', event: EventEntity): void | Promise<void>
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
</script>

<template>
  <div w-full>
    <component
      :is="button ? Button : 'div'"
      :style="{ height: `${height}px` }"
      type="text"
      row justify-center
      w-full p-0 m-0 rounded-0
      @click="handleClick"
    >
      <div center min-w-20px shrink-0 p-2>
        <div
          :style="{ backgroundColor: '#93c5fd' }"
          w-12px h-12px rounded-sm
        />
      </div>
      <div grow column p-1 overflow-hidden>
        <div text="xs text-1" ellipsis>
          {{ data?.serial }}.{{ data?.name }}
        </div>
        <div text="xs text-3" ellipsis>
          {{ range?.start }} - {{ range?.end }}
        </div>
      </div>
    </component>
    <slot name="extra" :event="data"></slot>
  </div>
</template>
