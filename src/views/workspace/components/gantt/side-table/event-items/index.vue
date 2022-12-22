<script setup lang="ts">
import { useStore } from '../../store'
import Item from './item.vue'

const store = useStore()
const handleScroll = (e: UIEvent) => {
  store.eventScrollTop = -(e.currentTarget as HTMLDivElement).scrollTop
}

const ids = Array(10).fill(0).map((_, v) => v)
</script>

<template>
  <div
    h-full
    overflow-y-scroll overflow-x-hidden
    @scroll="handleScroll"
  >
    <Item v-for="id in ids" :id="id" :key="id" />
  </div>
</template>
