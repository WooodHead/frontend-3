<script setup lang="ts">
const { position } = defineProps<{ position: number[] }>()

const [a, b] = $(position)

watchEffect(() => {
  console.log(a, b)
})
</script>

<template>
  <div
    border="2 border-2" w-64px h-64px center
  >
    {{ a }} {{ b }}
  </div>
</template>
