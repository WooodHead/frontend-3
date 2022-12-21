<script setup lang="ts">
const { expand } = defineProps<{ expand: boolean }>()

let darkMode = $ref(false)
const toggleDarkMode = () => {
  darkMode = !darkMode
}
watch($$(darkMode), () => {
  if (darkMode) {
    document.documentElement.classList.add('dark')
    document.body.setAttribute('arco-theme', 'dark')
  }
  else {
    document.documentElement.classList.remove('dark')
    document.body.setAttribute('arco-theme', 'light')
  }
})

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
    <div
      :class="`${darkMode ? `i-radix-icons-moon` : `i-radix-icons-sun`}`"
      w-32px h-32px
      absolute top-6 right-6 cursor-pointer
      text-gray-500
      @click="toggleDarkMode"
    ></div>
    <v-btn
      v-for="{ title } of menuConfig"
      :key="title" draggable="false"
      height="64px" variant="text"
      rounded-0 center font-bold text-xl
    >
      {{ title }}
    </v-btn>
  </div>
</template>
