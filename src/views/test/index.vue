<script setup lang="ts">
import TestComponent from './testComponent.vue'
import message from '@/components/message'

const props = $ref([
  { id: '1', position: [1, 2, 3, 4] },
  { id: '2', position: [1, 2, 3, 4] },
])

const handleClick = () => {
  message.success('1')
}
</script>

<template>
  <div relative>
    <v-btn color="primary" @click="handleClick">
      更改
    </v-btn>
    <!-- <TestComponent
      v-for="info in props" :key="info.id"
      :position="info.position"
    /> -->
  </div>
</template>
