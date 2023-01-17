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
    overflow-y-auto overflow-x-hidden
    @scroll="handleScroll"
  >
    <!-- TODO 列表动画 -->
    <EventDetailItem
      v-for="id in ids"
      :id="id" :key="id"
      border="0 b border-2"
    />
  </div>
</template>
