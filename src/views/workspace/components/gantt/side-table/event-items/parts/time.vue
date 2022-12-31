<script setup lang="ts">
import type { UnitID } from '@project-chiral/unit-system'
import Basic from './basic.vue'

const { start, end } = defineProps<{ start?: UnitID; end?: UnitID }>()
</script>

<template>
  <Basic>
    <div center w-full overflow-hidden>
      <!-- <div center text-sm px-2 overflow-hidden whitespace-pre-wrap>
      {{ start && end && `${start.toBriefString()} ~ ${end.toBriefString()}` }}
    </div> -->
      <div class="i-radix-icons-timer" text="2xl gray-4"></div>
      <!-- TODO 当尺寸过小时显示图标，否则显示时间文字 -->
    </div>
  </Basic>
</template>
