<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { Motion, Presence } from '@motionone/vue'
import { UnitIDRange } from '@project-chiral/unit-system'
import api from '@/api/api'
import { fadeInOut } from '@/utils/animation'

const { id, enabled = true } = defineProps<{ id: number; enabled?: boolean }>()

const { data, isSuccess, isLoading, isError } = $(useQuery({
  enabled: computed(() => enabled),
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
      <ACard
        :title="data?.name"
        full shadow-lg max-h-400px overflow-y-auto
        @wheel.stop
      >
        <Status v-if="!isSuccess" :loading="isLoading" :error="isError" />
        <div v-else>
          {{ data }}
        </div>
      </ACard>
    </Motion>
  </Presence>
</template>
