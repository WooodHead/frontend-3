<script setup lang="ts">
import type { UnitID } from '@project-chiral/unit-system'
import { useStore } from '../../../store'
import { HEADER_HEIGHT } from '../../../const'
import Unit from './unit.vue'

const store = useStore()
</script>

<template>
  <div
    v-for="id in store.unitQueue"
    :key="id.uid"
    :style="{
      left: `${store.unitOffset(id)}px`,
      top: `${HEADER_HEIGHT / 2}px`,
    }"
    absolute row bg-white
  >
    <Unit v-for="subUnit of id.children" :key="subUnit.uid" :unit="subUnit" />
  </div>
</template>
