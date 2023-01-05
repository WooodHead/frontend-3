<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { Motion } from '@motionone/vue'
import api from '@/api/api'
import { fadeInOut } from '@/utils/animation'

const { id } = defineProps<{ id: number }>()

const { data, isSuccess, isLoading, isError } = $(useQuery({
  enabled: true,
  queryKey: ['event', id, 'detail'],
  queryFn: () => api.event.getEventDetail(id),
}))
</script>

<template>
  <Motion
    v-bind="fadeInOut"
    card
    absolute overflow-hidden
    w-200px min-h-200px
  >
    <Status v-if="!isSuccess" :loading="isLoading" :error="isError" />
    <div v-else full>
      <div w-full h-2 :style="{ backgroundColor: data?.color }"></div>
      <div p-2>
        <div text-xl>
          {{ data?.name }}
        </div>
        <ADivider />
        <div>114514</div>
      </div>
    </div>
  </Motion>
</template>
