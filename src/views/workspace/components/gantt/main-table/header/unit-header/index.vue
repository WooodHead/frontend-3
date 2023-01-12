<script setup lang="ts">
import { UnitID } from '@project-chiral/unit-id'
import { useStore } from '../../../store'
import Unit from './unit.vue'

const { units: unitQueue } = $(useStore())
</script>

<template>
  <Unit
    v-for="(unit, i) of unitQueue"
    :id="unit as UnitID"
    :key="unit.uid"
    :left="i === 0"
    :right="i === unitQueue.length - 1"
  />
</template>
