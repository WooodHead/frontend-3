<script setup lang="ts">
import { Motion } from '@motionone/vue'
import Sector from './sector.vue'
import { fadeInOut } from '@/utils/animation'

const { names, innerRadius, outerRadius, isConnecting } = defineProps<{
  names: string[]
  innerRadius: number
  outerRadius: number
  isConnecting: boolean
}>()

const emits = defineEmits<{
  (event: 'active', name: string): void
}>()

let activeName = $ref<string>()
const handleMouseEnter = (name: string) => {
  if (!isConnecting) { return }
  activeName = name
  emits('active', name)
}

watch(() => isConnecting, isConnecting => {
  if (!isConnecting) { activeName = undefined }
})

const sectorAngle = $computed(() => 360 / names.length)

const sectors = $computed(() => names.map((name, index) => ({
  name,
  innerRadius,
  outerRadius,
  offsetAngle: sectorAngle * index,
  sectorAngle,
})))
</script>

<template>
  <Motion absolute v-bind="fadeInOut">
    <svg :width="outerRadius * 2" :height="outerRadius * 2">
      <Sector
        v-for="sector in sectors"
        v-bind="sector"
        :key="sector.name"
        :active="sector.name === activeName"
        @mouseenter="handleMouseEnter"
      />
    </svg>
  </Motion>
</template>
