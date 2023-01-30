<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { useStore } from '../../store'
import api from '@/api/api'

const store = useStore()
const { eventId } = $(storeToRefs(store))

const { data: event } = useQuery({
  enabled: computed(() => eventId !== undefined),
  queryKey: computed(() => ['event', eventId]),
  queryFn: () => api.event.getEvent(eventId!),
})
</script>

<template>
  <div nim-column space-y-2>
    <ACard title="基本信息">
      <template #extra>
        <ALink type="text">
          修改
        </ALink>
      </template>
      <ADescriptions
        :column="1"
        :data="event ? [
          { label: '序号', value: `${event.serial}` },
          { label: '名称', value: event.name },
          { label: '类型', value: event.type },
        ] : []"
      />
    </ACard>
    <ACard title="简介">
      <template #extra>
        <ALink type="text">
          修改
        </ALink>
      </template>
      {{ event?.description }}
    </ACard>
  </div>
</template>
