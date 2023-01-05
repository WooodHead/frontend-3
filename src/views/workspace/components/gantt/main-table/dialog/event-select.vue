<script setup lang="ts">
import { useStore } from '../../store'
import Basic from './basic.vue'

const model = $ref({})
const store = useStore()
let { selectedEvents } = $(storeToRefs(store))

const handleCancel = () => {
  selectedEvents = []
}
</script>

<template>
  <Basic
    v-if="selectedEvents.length > 0"
    @cancel="handleCancel"
  >
    <AForm :model="model">
      <AFormItem>
        1
      </AFormItem>
    </AForm>
  </Basic>
</template>
