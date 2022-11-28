<script setup lang="ts">
import { UnitID } from '@project-chiral/unit-system'
import { useStore } from '../../store'
import type { BlockProps } from './block.vue'
import Block from './block.vue'
import type { IEvent } from '@/api/type'

const store = useStore()

const eventData: IEvent[] = []
const blockData = computed<BlockProps[]>(() =>
  eventData.map(({ id, start, end, type }) => ({
    id,
    start: UnitID.deserialize(start),
    end: UnitID.deserialize(end),
    short: type === 'auto-collection',
  })))
</script>

<template>
  <Block v-for="data in blockData" :key="data.id" v-bind="data" />
</template>
