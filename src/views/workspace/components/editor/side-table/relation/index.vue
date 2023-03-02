<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { useStore } from '../../store'
import EventCard from './event-card.vue'
import api from '@/api/api'
import { useEventConnectSubs, useEventConnectSups, useEventDisconnectSubs, useEventDisconnectSups } from '@/api/event'

const store = useStore()
const { relationDot, eventId } = storeToRefs(store)

const badges = ref({
  resolved: [] as number[],
  unresolved: [] as string[],
})
watch(badges, badges => {
  relationDot.value = badges.unresolved.length !== 0
}, { deep: true })

const { data } = useQuery({
  enabled: computed(() => eventId.value !== undefined),
  queryKey: computed(() => ['event', eventId.value, 'detail']),
  queryFn: () => api.event.getDetail(eventId.value!),
})
watch(() => data.value?.characters, charas => {
  badges.value.resolved = charas ?? []
}, { immediate: true, deep: true })

const { mutate: connectSups } = useEventConnectSups(eventId)
const { mutate: disconnectSups } = useEventDisconnectSups(eventId)
const { mutate: connectSubs } = useEventConnectSubs(eventId)
const { mutate: disconnectSubs } = useEventDisconnectSubs(eventId)
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
      title="父事件" :ids="data?.sups ?? []"
      @add="connectSups({ sups: [$event] })"
      @remove="disconnectSups({ sups: [$event] })"
    />
    <EventCard
      title="子事件" :ids="data?.subs ?? []"
      @add="connectSubs({ subs: [$event] })"
      @remove="disconnectSubs({ subs: [$event] })"
    />
  </div>
</template>
