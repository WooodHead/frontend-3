<script setup lang="ts">
import type { EventEntity } from '@/api/api-base'
import {
  useRelationCreate,
  useRelationRemove,
  useNodeRelationsQuery,
} from '@/api/graph'
import { CHARA, PARTICIPATED_IN } from '@/api/graph/schema'

const { id } = defineProps<{
  id?: number
}>()

const { data: relations, suspense } = useNodeRelationsQuery(
  computed(() => (id ? { type: CHARA, id } : undefined))
)
await suspense()

const events = computed(() => relations.value?.PARTICIPATED_IN.to ?? [])

const { mutateAsync: connect } = useRelationCreate()
const handleAddEvent = async (eventId: number) => {
  if (!id) {
    return
  }
  await connect({
    type: PARTICIPATED_IN,
    from: id,
    to: eventId,
  })
}
const { mutateAsync: disconnect } = useRelationRemove()
const handleRemoveEvent = async (eventId: number) => {
  if (!id) {
    return
  }
  await disconnect({
    type: PARTICIPATED_IN,
    from: id,
    to: eventId,
  })
}

const visible = ref(false)

const handleSelect = (event: EventEntity | undefined) => {
  if (!event) {
    return
  }
  handleAddEvent(event.id)
  visible.value = false
}
</script>

<template>
  <ACard w-full :bordered="false" title="参与事件" :body-style="{ padding: 0 }">
    <template #extra>
      <ATrigger v-model:popup-visible="visible" trigger="click">
        <AButton type="text">
          <template #icon>
            <div i-radix-icons-plus text-lg></div>
          </template>
        </AButton>
        <template #content>
          <div card-border p-2>
            <Selector
              event
              placeholder="选择事件"
              @select:event="handleSelect"
            />
          </div>
        </template>
      </ATrigger>
    </template>
    <div max-h-200px overflow-y-auto rounded>
      <EventItem
        v-for="eventId of events"
        :id="eventId"
        :key="eventId"
        button
        removable
        @remove="handleRemoveEvent"
      />
    </div>
  </ACard>
</template>
