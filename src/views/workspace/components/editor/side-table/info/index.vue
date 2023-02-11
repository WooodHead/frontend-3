<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { UnitIDRange } from '@project-chiral/unit-id'
import { useStore } from '../../store'
import InfoModal from './info-modal.vue'
import api from '@/api/api'

const store = useStore()
const { eventId } = storeToRefs(store)

const { data: event } = useQuery({
  enabled: computed(() => eventId.value !== undefined),
  queryKey: computed(() => ['event', eventId.value]),
  queryFn: () => api.event.getEvent(eventId.value!),
  select: data => {
    const range = UnitIDRange.deserialize(data.range)
    return {
      ...data,
      name: `${data.serial}. ${data.name}`,
      range: `${range.start} - ${range.end}`,
    }
  },
})

const visible = ref(false)
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
          { label: '名称', value: event.name },
          { label: '类型', value: event.type },
          { label: '时间', value: event.range },
        ] : []"
      />
    </ACard>
    <ACard v-if="event?.description" title="简介">
      {{ event.description }}
    </ACard>
  </div>
</template>
