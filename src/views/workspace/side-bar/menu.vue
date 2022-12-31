<script setup lang="ts">
import api from '@/api/api'
import { useGlobalStore } from '@/store'

const { expand } = defineProps<{ expand: boolean }>()

const globalStore = useGlobalStore()
let { darkMode } = $(storeToRefs(globalStore))

const toggleDarkMode = () => {
  darkMode = !darkMode

  if (darkMode) {
    document.body.setAttribute('arco-theme', 'dark')
    document.body.classList.add('dark')
    document.body.style.colorScheme = 'dark'
  }
  else {
    document.body.setAttribute('arco-theme', 'light')
    document.body.classList.remove('dark')
    document.body.style.colorScheme = 'light'
  }
}

onBeforeMount(async () => {
  const { darkMode } = await api.project.getProjectSettings()
  if (darkMode) { toggleDarkMode() }
})
watch($$(darkMode), darkMode => {
  api.project.updateProjectSettings({ darkMode })
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
    bg-gray-2 shadow-lg
    z-20
  >
    <div
      :class="`${darkMode ? `i-radix-icons-moon` : `i-radix-icons-sun`}`"
      w-32px h-32px
      absolute top-6 right-6 cursor-pointer
      text-gray-500
      @click="toggleDarkMode"
    ></div>
    <AButton
      v-for="{ title } of menuConfig"
      :key="title"
      center h-64px rounded-0 text-xl
    >
      {{ title }}
    </AButton>
  </div>
</template>
