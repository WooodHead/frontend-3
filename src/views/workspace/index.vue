<script setup lang="ts">
import '@unocss/reset/tailwind.css'
import SideBar from './side-bar/index.vue'
import Body from './body/index.vue'
</script>

<template>
  <div row h-full center>
    <SideBar />
    <Body />
  </div>
</template>
