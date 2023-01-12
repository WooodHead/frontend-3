<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { Motion, Presence } from '@motionone/vue'
import { UnitIDRange } from '@project-chiral/unit-id'
import api from '@/api/api'
import { fadeInOut } from '@/utils/animation'

const { id, show = false, enabled = true } = defineProps<{
  id: number
  show?: boolean
  enabled?: boolean
}>()

const { data, isSuccess, isLoading, isError } = $(useQuery({
  enabled: computed(() => enabled),
  queryKey: computed(() => ['event', id, 'detail']),
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
      v-if="show"
      v-bind="fadeInOut"
      absolute overflow-hidden
    >
      <ACard
        :title="data?.name"
        card max-w-300px max-h-400px overflow-y-auto
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
