<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { UnitIDRange } from '@project-chiral/unit-id'
import api from '@/api/api'

const { id, height = 40 } = defineProps<{
  id: number
  height?: number
}>()

const { data } = useQuery({
  queryKey: computed(() => ['event', id]),
  queryFn: () => api.event.getEvent(id),
  select: ({ range, ...rest }) => ({
    ...rest,
    range: UnitIDRange.deserialize(range),
  }),
})
</script>

<template>
  <AButton
    :style="{ height: `${height}px` }"
    type="text" long p-0 m-0
    rounded-0
  >
    <div bg-primary-6 shrink-0 h-full w-4px />
    <div grow column text-xs p-1 whitespace-nowrap overflow-hidden>
      {{ data?.name }} <br>
      <div text-text-3 text-ellipsis>
        {{ data?.range.start }} - {{ data?.range.end }}
      </div>
    </div>
  </AButton>
</template>
