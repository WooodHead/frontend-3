<script setup lang="ts">
import { Motion, Presence } from '@motionone/vue'
import { useStore } from './store'
import TestComponent from './testComponent.vue'

const store = useStore()

const handleClick = () => {
  store.push()
  console.log(store.array)
}

const [first] = $(store.array)

const handleChange = () => {
  first.fuck = 2
}
</script>

<template>
  <v-btn color="primary" @click="handleClick">
    添加
  </v-btn>
  <v-btn color="primary" @click="handleChange">
    改变
  </v-btn>
  {{ first }}
</template>
