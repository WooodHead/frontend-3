<script setup lang="ts">
import { useStore } from './store'

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
