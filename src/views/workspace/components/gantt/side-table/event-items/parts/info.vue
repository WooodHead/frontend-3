<script setup lang="ts">
import Basic from './basic.vue'
import Editor from '@/views/workspace/components/editor/index.vue'
import type { IEvent } from '@/api/type'

const { isLoading, data, color } = defineProps<{
  isLoading?: boolean
  data?: IEvent
  color?: string
}>()

let dialogOpen = $ref(false)
const handleClick = () => {
  dialogOpen = true
}
</script>

<template>
  <Basic @click="handleClick">
    <div bg-blue-400 shrink-0 w-8px />
    <div grow center-x p-2>
      114514
    </div>
  </Basic>
  <v-dialog
    v-model="dialogOpen"
    width="75%" height="75%"
    transition="dialog-transition"
  >
    <Editor :props="{ id: '1' }" />
  </v-dialog>
</template>
