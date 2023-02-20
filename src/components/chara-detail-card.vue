<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { UnitIDRange } from '@project-chiral/unit-id'
import DetailCard from './detail-card/index.vue'
import api from '@/api/api'

const { id, show = true } = defineProps<{
  id: number
  show?: boolean
}>()

const { data, isSuccess, isLoading, isError } = useQuery({
  enabled: false,
  queryKey: computed(() => ['character', id]),
  queryFn: () => api.character.getCharacter(id),
  select: data => ({
    ...data,
    range: data.range ? UnitIDRange.deserialize(data.range) : undefined,
  }),
})

// TODO chara-detail-card
</script>

<template>
  <DetailCard
    :show="show"
    :title="`${data?.name}`"
    :success="isSuccess"
    :loading="isLoading"
    :error="isError"
  >
    fuck
  </DetailCard>
</template>
