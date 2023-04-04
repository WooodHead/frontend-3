<script setup lang="ts">
import DetailCard from './detail-card/index.vue'
import { useCharaQuery } from '@/api/character'

const { id, show = true } = defineProps<{
  id: number
  show?: boolean
}>()

const { data, isSuccess, isLoading, isError } = useCharaQuery(computed(() => id))

const avatarName = computed(() => {
  const name = data.value?.name
  if (!name) { return undefined }
  return name.includes(' ') ? name.split(' ')[0] : name.slice(-2)
})

// TODO chara-detail-card
</script>

<template>
  <DetailCard
    :show="show"
    :success="isSuccess"
    :loading="isLoading"
    :error="isError"
  >
    <div w-full center-x gap-4 m-4>
      <AAvatar :size="48">
        <img v-if="data?.avatar" :src="data.avatar">
        <div v-else>
          {{ avatarName }}
        </div>
      </AAvatar>
      <div column>
        <div text="2xl text-1" font-semibold>
          {{ data?.name }}
        </div>
        <div text="sm text-3">
          {{ data?.alias.join(', ') }}
        </div>
      </div>
    </div>
  </DetailCard>
</template>
