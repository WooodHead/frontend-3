<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import api from '@/api/api'
import emitter from '@/utils/emitter'
import Item from '@/components/item/index.vue'
import { UnitIDRange } from '@/utils/unit-id'

const { id, height, button = false, eventSelect = false, removable, removeText, animate } = defineProps<{
  id: number
  height?: number
  button?: boolean
  eventSelect?: boolean
  removable?: boolean
  removeText?: string
  animate?: boolean | Record<string, any>
}>()

const emit = defineEmits<{
  (e: 'click', id: number): void
  (e: 'hover', id: number): void
  (e: 'remove', id: number): void
}>()

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
  emit('click', data.value.id)
  if (eventSelect) {
    emitter.emit('event-select', { id: data.value.id })
  }
}
</script>

<template>
  <Item
    :animate="animate"
    :button="button"
    :height="height"
    :removable="removable"
    :remove-text="removeText"
    @click="handleClick"
    @hover="data && $emit('hover', data.id)"
    @remove="data && $emit('remove', data.id)"
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
