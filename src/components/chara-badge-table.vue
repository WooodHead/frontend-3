<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import AddButton from './chara-badge-table/add-button.vue'
import { aiApi } from '@/api/api'
import Resolved from '@/components/chara-badge-table/resolved.vue'
import Unresolved from '@/components/chara-badge-table/unresolved.vue'
import { useNodeRelationsQuery } from '@/api/graph'
import { EVENT } from '@/api/graph/schema'

const {
  eventId,
  editable = false,
  disabled = false,
} = defineProps<{
  eventId: number
  editable?: boolean
  disabled?: boolean
}>()
const { data: unresolved } = useQuery({
  queryKey: computed(() => ['ai', 'chara', eventId, 'unresolved']),
  queryFn: () => aiApi.chara.getUnresolved(eventId),
})
const { data: relations } = useNodeRelationsQuery(
  computed(() => ({
    type: EVENT,
    id: eventId,
  }))
)
const resolved = computed(() => relations.value?.PARTICIPATED_IN.from ?? [])
</script>

<template>
  <div full row flex-wrap gap-1 overflow-y-auto>
    <AddButton v-if="editable && !disabled" :event-id="eventId" />
    <Resolved
      v-for="id of resolved"
      :id="id"
      :key="id"
      :closable="editable"
      :disabled="disabled"
      :event-id="eventId"
    />
    <Unresolved
      v-for="{ name, options } of unresolved"
      :key="name"
      :name="name"
      :options="options"
      :event-id="eventId"
      :closable="editable"
      :disabled="disabled"
    />
  </div>
</template>
