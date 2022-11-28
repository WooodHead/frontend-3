<script setup lang="ts">
const { expand } = defineProps<{ expand: boolean }>()

const menuConfig: { title: string }[] = [
  { title: '设置' },
  { title: '帮助' },
  { title: '关于' },
]
</script>

<template>
  <div
    column justify-center
    fixed left="-200px"
    transition-transform
    :class="`${expand && `translate-x-260px`}`"
    w-200px h-full
    bg-gray-100 backdrop="filter blur-8" shadow-lg
    z="10"
  >
    <v-btn
      v-for="{ title } of menuConfig" :key="title"
      height="64px"
      rounded-0 variant="text" center font-bold text-xl
    >
      {{ title }}
    </v-btn>
  </div>
</template>
