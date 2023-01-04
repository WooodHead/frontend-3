<script setup lang="ts">
import { useStore } from '../../../store'
import { HEADER_HEIGHT, UNIT_WIDTH } from '../../../const'
import Unit from './unit.vue'

const store = useStore()
</script>

<template>
  <div
    v-for="id in store.units"
    :key="id.uid"
    :style="{
      left: `${store.subUnitOffset(id) * UNIT_WIDTH}px`,
      top: `${HEADER_HEIGHT / 2}px`,
    }"
    absolute row
  >
    <Unit v-for="subUnit of id.children" :key="subUnit.uid" :unit="subUnit" />
  </div>
</template>
