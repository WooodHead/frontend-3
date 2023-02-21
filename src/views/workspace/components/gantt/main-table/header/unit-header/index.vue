<script setup lang="ts">
import { useStore } from '../../../store'
import Unit from './unit.vue'
import { UnitID } from '@/utils/unit-id'

const store = useStore()
const { units } = storeToRefs(store)
</script>

<template>
  <Unit
    v-for="(unit, i) of units"
    :id="unit as UnitID"
    :key="unit.uid"
    :left="i === 0"
    :right="i === units.length - 1"
  />
</template>
