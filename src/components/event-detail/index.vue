<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { Motion, Presence } from '@motionone/vue'
import { UnitIDRange } from '@project-chiral/unit-system'
import api from '@/api/api'
import { fadeInOut } from '@/utils/animation'

const { id } = defineProps<{ id: number }>()

const { data, isSuccess, isLoading, isError } = $(useQuery({
  enabled: true,
  queryKey: ['event', id, 'detail'],
  queryFn: () => api.event.getEventDetail(id),
  select: data => ({
    ...data,
    range: UnitIDRange.deserialize(data.range),
  }),
}))
</script>

<template>
  <Presence>
    <Motion
      v-bind="fadeInOut"
      absolute overflow-hidden
    >
      <ACard full shadow-lg :title="data?.name">
        <Status v-if="!isSuccess" :loading="isLoading" :error="isError" />
        <div v-else></div>
      </ACard>
    </Motion>
  </Presence>
</template>
