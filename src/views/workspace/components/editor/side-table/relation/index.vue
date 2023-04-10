<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { useStore } from '../../store'
import { useUpdateChara } from '../query'
import EventCard from './event-card.vue'
import { useRelationCreate, useRelationRemove, useRelationsQuery } from '@/api/graph'
import { EVENT, INCLUDES } from '@/api/graph/schema'
import api from '@/api/api'

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
  queryKey: computed(() => ['event', eventId.value]),
  queryFn: () => api.event.get(eventId.value!),
})

const { data: relations } = useRelationsQuery(computed(() => eventId.value ? { type: EVENT, id: eventId.value } : undefined))
watchEffect(() => {
  badges.value.resolved = relations.value?.PARTICIPATED_IN.from ?? []
})
const sups = computed(() => relations.value?.INCLUDES.from ?? [])
const subs = computed(() => relations.value?.INCLUDES.to ?? [])

const { mutateAsync: connect } = useRelationCreate()
const { mutateAsync: disconnect } = useRelationRemove()
const { mutateAsync: updateChara, isLoading } = useUpdateChara()

const handleRefresh = async () => {
  if (!eventId.value) { return }
  const options = await updateChara({ id: eventId.value })

  // TODO 把结果对接到 chara-badge-table 中
}
</script>

<template>
  <div nim-column space-y-2>
    <ACard title="参与角色" :bordered="false" :loading="isLoading">
      <template #extra>
        <ALink :disabled="data?.done" @click="handleRefresh">
          刷新
        </ALink>
      </template>
      <CharaBadgeTable
        v-if="eventId"
        v-model="badges"
        :disabled="data?.done"
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
