<script setup lang="ts">
const { innerRadius = 0, outerRadius, offsetAngle = 0, sectorAngle } = defineProps<{
  innerRadius?: number
  outerRadius: number
  offsetAngle?: number
  sectorAngle: number
}>()

const emit = defineEmits<{
  (e: 'pointerover'): void
}>()

const toRadians = (angle: number) => (angle * Math.PI) / 180

const innerStart = computed(() => ({
  x: outerRadius + innerRadius * Math.sin(toRadians(offsetAngle)),
  y: outerRadius - innerRadius * Math.cos(toRadians(offsetAngle)),
}))
const outerStart = {
  x: outerRadius + outerRadius * Math.sin(toRadians(offsetAngle)),
  y: outerRadius - outerRadius * Math.cos(toRadians(offsetAngle)),
}

const outerEnd = computed(() => ({
  x: outerRadius + outerRadius * Math.sin(toRadians(sectorAngle + offsetAngle)),
  y: outerRadius - outerRadius * Math.cos(toRadians(sectorAngle + offsetAngle)),
}))

const innerEnd = computed(() => ({
  x: outerRadius + innerRadius * Math.sin(toRadians(sectorAngle + offsetAngle)),
  y: outerRadius - innerRadius * Math.cos(toRadians(sectorAngle + offsetAngle)),
}))

const textAngle = computed(() => sectorAngle / 2 + offsetAngle)

const textPosition = computed(() => ({
  x: outerRadius + (outerRadius + innerRadius) / 2 * Math.sin(toRadians(textAngle.value)),
  y: outerRadius - (outerRadius + innerRadius) / 2 * Math.cos(toRadians(textAngle.value)),
}))

const handleMouseEnter = () => {
  console.log('')
  // TODO sector选择
}
</script>

<template>
  <path
    fill-blue-2 hover:fill-red-2 transition-colors
    :d="`M ${innerStart.x} ${innerStart.y} A ${innerRadius} ${innerRadius} 0 0 1 ${innerEnd.x} ${innerEnd.y} L ${outerEnd.x} ${outerEnd.y} A ${outerRadius} ${outerRadius} 0 0 0 ${outerStart.x} ${outerStart.y} Z`"
    @mouseenter="handleMouseEnter"
  />
  <text
    pointer-events-none
    :x="textPosition.x"
    :y="textPosition.y"
    text-anchor="middle"
    dominant-baseline="middle"
    :transform="`rotate(${textAngle} ${textPosition.x} ${textPosition.y})`"
  >
    中文内容
  </text>
</template>
