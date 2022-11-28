<script setup lang="ts">
import type { UnitID } from '@project-chiral/unit-system'
import { useStore } from '../../store'
import Unit from './unit.vue'
const { id } = defineProps<{
  id: UnitID
}>()

const store = useStore()
const offset = store.unitOffset(id)
const subUnits = id.children
</script>

<template>
  <div
    :draggable="false"
    :style="{ left: `${offset}px` }"
    absolute row z-0
  >
    <Unit v-for="subID of subUnits" :id="subID" :key="subID.uid" />
  </div>
</template>
