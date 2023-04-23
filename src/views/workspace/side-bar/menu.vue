<script setup lang="ts">
import useWSStore from '../store'
import api from '@/api/api'
import { useGlobalStore } from '@/store'

const router = useRouter()

const WSStore = useWSStore()
const { menuExpand } = storeToRefs(WSStore)

const globalStore = useGlobalStore()
const { darkMode } = storeToRefs(globalStore)

const toggleDarkMode = () => {
  darkMode.value = !darkMode.value

  if (darkMode.value) {
    document.body.setAttribute('arco-theme', 'dark')
    document.body.classList.add('dark')
    document.body.style.colorScheme = 'dark'
  } else {
    document.body.setAttribute('arco-theme', 'light')
    document.body.classList.remove('dark')
    document.body.style.colorScheme = 'light'
  }
}

onMounted(async () => {
  const settings = await api.project.getSettings()
  if (settings.darkMode) {
    toggleDarkMode()
  }
})
watch(darkMode, (darkMode) => {
  api.project.updateSettings({ darkMode })
})

const menuConfig: { title: string; name: string }[] = [
  { title: '设置', name: 'ws-settings' },
  { title: '帮助', name: 'ws-help' },
  { title: '关于', name: 'ws-about' },
]
</script>

<template>
  <div
    column
    justify-center
    fixed
    left="-200px"
    transition-transform
    :translate-x="menuExpand ? '260px' : '0'"
    w-200px
    h-full
    bg-gray-2
    shadow-lg
    z-20
  >
    <div
      :class="`${darkMode ? `i-radix-icons-moon` : `i-radix-icons-sun`}`"
      w-32px
      h-32px
      absolute
      top-6
      right-6
      cursor-pointer
      text-gray-5
      @click="toggleDarkMode"
    ></div>
    <AButton
      v-for="{ title, name } of menuConfig"
      :key="title"
      center
      h-64px
      rounded-0
      text-xl
      @click="router.push({ name })"
    >
      {{ title }}
    </AButton>
  </div>
</template>
