<script setup lang="ts">
import { useStore } from '../../store'

const store = useStore()

const handleScroll = ({ currentTarget }: UIEvent) => {
  store.eventScrollTop = -(currentTarget as HTMLDivElement).scrollTop
}

const ids = $computed(() => store.visibleEvents.data.map(({ eventId }) => eventId))
</script>

<template>
  <div
    h-full
    overflow-y-auto
    @scroll="handleScroll"
  >
    <!-- TODO 列表动画 -->
    <EventItem
      v-for="id in ids"
      :id="id"
      :key="id"
      button
      event-select
    />
  </div>
</template>
