<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { useStore } from '../../store'
import { useResolveChara } from '../query'
import EventCard from './event-card.vue'
import {
  useNodeRelationsQuery,
  useRelationCreate,
  useRelationRemove,
} from '@/api/graph'
import { EVENT, INCLUDES } from '@/api/graph/schema'
import api, { aiApi } from '@/api/api'

const store = useStore()
const { relationDot, eventId } = storeToRefs(store)

const { data: unresolved } = useQuery({
  enabled: computed(() => eventId.value !== undefined),
  queryKey: computed(() => ['ai', 'chara', eventId, 'unresolved']),
  queryFn: () => aiApi.chara.getUnresolved(eventId.value!),
})
// 当存在unresolved时，在“关系”tab上显示红点
watchEffect(() => {
  relationDot.value = (unresolved.value?.length ?? 0) > 0
})

const { data } = useQuery({
  enabled: computed(() => eventId.value !== undefined),
  queryKey: computed(() => ['event', eventId.value]),
  queryFn: () => api.event.get(eventId.value!),
})

const { data: relations } = useNodeRelationsQuery(
  computed(() =>
    eventId.value ? { type: EVENT, id: eventId.value } : undefined
  )
)

const sups = computed(() => relations.value?.INCLUDES.from ?? [])
const subs = computed(() => relations.value?.INCLUDES.to ?? [])

const { mutateAsync: connect } = useRelationCreate()
const { mutateAsync: disconnect } = useRelationRemove()
const { mutateAsync: updateChara, isLoading } = useResolveChara()

const handleUpdateChara = async () => {
  if (!eventId.value) {
    return
  }
  await updateChara({ id: eventId.value })
}
</script>

<template>
  <div nim-column space-y-2>
    <ACard title="参与角色" :bordered="false" :loading="isLoading">
      <template #extra>
        <ALink :disabled="data?.done" @click="handleUpdateChara">
          重新生成
        </ALink>
      </template>
      <CharaBadgeTable
        v-if="eventId"
        :disabled="data?.done"
        editable
        :event-id="eventId"
      />
    </ACard>
    <EventCard
      title="父事件"
      :ids="sups"
      @add="
        eventId &&
          connect({
            type: INCLUDES,
            from: $event,
            to: eventId,
          })
      "
      @remove="
        eventId &&
          disconnect({
            type: INCLUDES,
            from: $event,
            to: eventId,
          })
      "
    />
    <EventCard
      title="子事件"
      :ids="subs"
      @add="
        eventId &&
          connect({
            type: INCLUDES,
            from: eventId,
            to: $event,
          })
      "
      @remove="
        eventId &&
          disconnect({
            type: INCLUDES,
            from: eventId,
            to: $event,
          })
      "
    />
  </div>
</template>
