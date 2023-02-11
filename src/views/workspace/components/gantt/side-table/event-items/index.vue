<script setup lang="ts">
import { PresenceGroup } from '@motionone/vue'
import { EVENT_HEIGHT } from '../../const'
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
    <PresenceGroup>
      <EventItem
        v-for="id in ids"
        :id="id" :key="id"
        :height="EVENT_HEIGHT"
        animate button event-select
      />
    </PresenceGroup>
  </div>
</template>
