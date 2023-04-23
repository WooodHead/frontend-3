<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import AddButton from './chara-badge-table/add-button.vue'
import api from '@/api/api'
import { useEventUpdate } from '@/api/event'
import Resolved from '@/components/chara-badge-table/resolved.vue'
import Unresolved from '@/components/chara-badge-table/unresolved.vue'
import { useRelationsQuery } from '@/api/graph'
import { EVENT } from '@/api/graph/schema' 
import type { UnresolvedEntityDto } from '@/api/api-base'

const { eventId, editable = false, disabled = false } = defineProps<{
  eventId: number
  editable?: boolean
  disabled?: boolean
}>()

const { data: unresolved } = useQuery({
  queryKey: computed(() => ['event', eventId]),
  queryFn: () => api.event.get(eventId),
  select: ({ unresolved }) => unresolved as UnresolvedEntityDto[],
})
const { mutateAsync: update } = useEventUpdate()
const { data: relations } = useRelationsQuery(computed(() => ({
  type: EVENT,
  id: eventId,
})))

const resolved = computed(() => relations.value?.PARTICIPATED_IN.from ?? [])

const handleRemoveUnresolved = async (name: string) => {
  const newUnresolved = unresolved.value?.filter(({ name: n }) => n !== name)
  await update({
    id: eventId,
    unresolved: newUnresolved,
  })
}
</script>

<template>
  <div full row flex-wrap gap-1 overflow-y-auto>
    <AddButton v-if="editable && !disabled" :event-id="eventId" />
    <Resolved
      v-for="id of resolved"
      :id="id" :key="id"
      :closable="editable"
      :disabled="disabled"
      :event-id="eventId"
    />
    <Unresolved
      v-for="{ name, options } of unresolved ?? []"
      :key="name"
      :name="name" :options="options"
      :event-id="eventId"
      :closable="editable"
      :disabled="disabled"
      @remove="handleRemoveUnresolved"
    />
  </div>
</template>
