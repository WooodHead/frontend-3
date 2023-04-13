<script setup lang="ts">
import IntroCard from './intro-card.vue'
import EventCard from './event-card.vue'
import InfoCard from './info-card.vue'
import TitleCard from './title-card.vue'

const { id } = defineProps<{
  id?: number
}>()
</script>

<template>
  <Suspense>
    <div center-y gap-2 p-2>
      <TitleCard :id="id" />
      <InfoCard :id="id" />
      <IntroCard :id="id" w-full />
      <EventCard :id="id" />
    </div>
    <template #fallback>
      <Status full empty />
    </template>
  </Suspense>
</template>
