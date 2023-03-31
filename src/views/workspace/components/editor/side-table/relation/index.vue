<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { useStore } from '../../store'
import EventCard from './event-card.vue'
import api from '@/api/api'
import { useRelationCreate, useRelationRemove } from '@/api/graph'
import { EVENT, INCLUDES } from '@/api/graph/schema'

const store = useStore()
const { relationDot, eventId } = storeToRefs(store)

const badges = ref({
  resolved: [] as number[],
  unresolved: [] as string[],
})
watch(badges, badges => {
  relationDot.value = badges.unresolved.length !== 0
}, { deep: true })

const { data: relations } = useQuery({
  enabled: computed(() => eventId.value !== undefined),
  queryKey: computed(() => ['graph', 'relation', 'all', { type: EVENT, id: eventId.value! }]),
  queryFn: () => api.graph.getRelations({ type: EVENT, id: eventId.value! }),
})
watchEffect(() => {
  badges.value.resolved = relations.value?.PARTICIPATED_IN.from ?? []
})
const sups = computed(() => relations.value?.INCLUDES.from ?? [])
const subs = computed(() => relations.value?.INCLUDES.to ?? [])

const { mutateAsync: connect } = useRelationCreate()
const { mutateAsync: disconnect } = useRelationRemove()
</script>

<template>
  <div nim-column space-y-2>
    <ACard title="参与角色" :bordered="false">
      <CharaBadgeTable
        v-if="eventId"
        v-model="badges"
        editable :event-id="eventId"
      />
    </ACard>
    <EventCard
      title="父事件" :ids="sups"
      @add="eventId && connect({
        type: INCLUDES,
        from: $event,
        to: eventId,
      })"
      @remove="eventId && disconnect({
        type: INCLUDES,
        from: $event,
        to: eventId,
      })"
    />
    <EventCard
      title="子事件" :ids="subs"
      @add="eventId && connect({
        type: INCLUDES,
        from: eventId,
        to: $event,
      })"
      @remove="eventId && disconnect({
        type: INCLUDES,
        from: eventId,
        to: $event,
      })"
    />
  </div>
</template>
