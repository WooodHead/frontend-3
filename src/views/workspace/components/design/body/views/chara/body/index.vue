<script setup lang="ts">
import { Message } from '@arco-design/web-vue'
import IntroCard from './intro-card.vue'
import EventCard from './event-card.vue'
import InfoCard from './info-card.vue'
import TitleCard from './title-card.vue'
import type { ApiError } from '@/api/types'

const { id } = defineProps<{
  id?: number
}>()

const error = ref<ApiError | null>(null)
onErrorCaptured((e: ApiError) => {
  Message.error(`加载失败：${e.response?.data.message}`)
  error.value = e
})
</script>

<template>
  <Status v-if="id === undefined" full empty />
  <Status v-else-if="error" full error />
  <Suspense v-else>
    <div center-y gap-2 p-2>
      <TitleCard :id="id" />
      <InfoCard :id="id" />
      <IntroCard :id="id" w-full />
      <EventCard :id="id" />
    </div>
    <template #fallback>
      <Status full loading />
    </template>
  </Suspense>
</template>
