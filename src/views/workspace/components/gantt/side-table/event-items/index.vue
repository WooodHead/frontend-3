<script setup lang="ts">
import { useStore } from '../../store'
import Item from './item.vue'

const store = useStore()
const handleScroll = ({ currentTarget }: UIEvent) => {
  store.eventScrollTop = -(currentTarget as HTMLDivElement).scrollTop
}

const ids = $computed(() => store.visibleEvents.data)
</script>

<template>
  <div
    h-full
    overflow-y-auto overflow-x-hidden
    @scroll="handleScroll"
  >
    <!-- TODO 列表动画 -->
    <Item v-for="id in ids" :id="id" :key="id" />
  </div>
</template>
