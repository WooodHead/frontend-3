<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { UnitIDRange } from '@project-chiral/unit-id'
import { useStore } from '../../store'
import InfoModal from './info-modal.vue'
import api from '@/api/api'

const store = useStore()
const { eventId } = $(storeToRefs(store))

const { data: event } = useQuery({
  enabled: computed(() => eventId !== undefined),
  queryKey: computed(() => ['event', eventId]),
  queryFn: () => api.event.getEvent(eventId!),
  select: data => {
    const range = UnitIDRange.deserialize(data.range)
    return {
      ...data,
      serial: `${data.serial}`,
      range: `${range.start} - ${range.end}`,
    }
  },
})

const visible = $ref(false)
</script>

<template>
  <div nim-column space-y-2>
    <AButton @click="visible = true">
      修改
    </AButton>
    <InfoModal v-model:visible="visible" />
    <ACard title="基本信息">
      <ADescriptions
        :column="1"
        :data="event ? [
          { label: '序号', value: `${event.serial}` },
          { label: '名称', value: event.name },
          { label: '类型', value: event.type },
          { label: '时间', value: event.range },
        ] : []"
      />
    </ACard>
    <ACard title="简介">
      {{ event?.description }}
    </ACard>
  </div>
</template>
