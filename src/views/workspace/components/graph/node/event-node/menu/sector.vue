<script setup lang="ts">
const {
  name,
  innerRadius = 0,
  outerRadius,
  offsetAngle = 0,
  sectorAngle,
  active = false,
} = defineProps<{
  name: string
  innerRadius?: number
  outerRadius: number
  offsetAngle?: number
  sectorAngle: number
  active?: boolean
}>()

const emit = defineEmits<{
  (e: 'mouseenter', name: string): void
}>()

const toRad = (angle: number) => (angle * Math.PI) / 180

const innerStart = computed(() => ({
  x: outerRadius + innerRadius * Math.sin(toRad(offsetAngle)),
  y: outerRadius - innerRadius * Math.cos(toRad(offsetAngle)),
}))
const outerStart = {
  x: outerRadius + outerRadius * Math.sin(toRad(offsetAngle)),
  y: outerRadius - outerRadius * Math.cos(toRad(offsetAngle)),
}

const outerEnd = computed(() => ({
  x: outerRadius + outerRadius * Math.sin(toRad(sectorAngle + offsetAngle)),
  y: outerRadius - outerRadius * Math.cos(toRad(sectorAngle + offsetAngle)),
}))

const innerEnd = computed(() => ({
  x: outerRadius + innerRadius * Math.sin(toRad(sectorAngle + offsetAngle)),
  y: outerRadius - innerRadius * Math.cos(toRad(sectorAngle + offsetAngle)),
}))

const textAngle = computed(() => sectorAngle / 2 + offsetAngle)

const textPosition = computed(() => ({
  x:
    outerRadius +
    ((outerRadius + innerRadius) / 2) * Math.sin(toRad(textAngle.value)),
  y:
    outerRadius -
    ((outerRadius + innerRadius) / 2) * Math.cos(toRad(textAngle.value)),
}))

const handleMouseEnter = () => {
  emit('mouseenter', name)
}

// FIXME 当unocss升级到0.49.2及之后的版本，无法加载fill颜色
</script>

<template>
  <path
    absolute
    transition-colors
    shadow-lg
    :fill="active ? 'blue-2' : 'bg-4'"
    stroke="1 gray-3"
    :d="`
    M ${innerStart.x} ${innerStart.y}
    A ${innerRadius} ${innerRadius} 0 0 1 ${innerEnd.x} ${innerEnd.y}
    L ${outerEnd.x} ${outerEnd.y}
    A ${outerRadius} ${outerRadius} 0 0 0 ${outerStart.x} ${outerStart.y}
    Z`"
    @mouseenter="handleMouseEnter"
  />
  <text
    pointer-events-none
    fill-text-1
    :x="textPosition.x"
    :y="textPosition.y"
    text-anchor="middle"
    dominant-baseline="middle"
    :transform="`rotate(${textAngle} ${textPosition.x} ${textPosition.y})`"
  >
    {{ name }}
  </text>
</template>
