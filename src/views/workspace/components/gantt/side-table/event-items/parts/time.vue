<script setup lang="ts">
import type { UnitID } from '@project-chiral/unit-system'
import Basic from './basic.vue'

const { start, end } = defineProps<{ start?: UnitID; end?: UnitID }>()
</script>

<template>
  <Basic>
    <div center text-sm px-2 overflow-hidden whitespace-pre-wrap>
      {{ start && end && `${start.toBriefString()} ~ ${end.toBriefString()}` }}
    </div>
  </Basic>
</template>
