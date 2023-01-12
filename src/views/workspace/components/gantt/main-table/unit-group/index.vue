<script setup lang="ts">
import type { UnitID } from '@project-chiral/unit-id'
import { UNIT_WIDTH } from '../../const'
import { useStore } from '../../store'
import Unit from './unit.vue'
const { id } = defineProps<{
  id: UnitID
}>()

const store = useStore()
const offset = $computed(() => store.subUnitOffset(id) * UNIT_WIDTH)
const subUnits = $computed(() => id.children)
</script>

<template>
  <div
    :style="{ left: `${offset}px` }"
    absolute row z-0
  >
    <Unit v-for="subID of subUnits" :id="subID" :key="subID.uid" />
  </div>
</template>
