<script setup lang="ts">
import { HEADER_HEIGHT } from '../../const'
import UnitHeader from './unit-header/index.vue'
import SubUnitHeader from './sub-unit-header/index.vue'
</script>

<template>
  <div :style="{ height: `${HEADER_HEIGHT}px` }">
    <UnitHeader />
    <SubUnitHeader />
  </div>
</template>
