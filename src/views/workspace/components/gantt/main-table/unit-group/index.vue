<script setup lang="ts">
import { UNIT_WIDTH } from '../../const'
import { useStore } from '../../store'
import Unit from './unit.vue'
import type { UnitID } from '@/utils/unit-id'
const { id } = defineProps<{
  id: UnitID
}>()

const store = useStore()
const offset = computed(() => store.subUnitOffset(id) * UNIT_WIDTH)
</script>

<template>
  <div :style="{ left: `${offset}px` }" absolute row z-0>
    <Unit v-for="subID of id.children" :id="subID" :key="subID.uid" />
  </div>
</template>
