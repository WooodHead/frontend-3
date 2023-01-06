<script setup lang="ts">
import { useStore } from '../../store'
import Basic from './basic.vue'

const model = $ref({})
const store = useStore()
let { selectedEvents } = $(storeToRefs(store))

let visible = $ref(false)

const handleCancel = () => {
  selectedEvents = []
}
const handleOk = () => {
  visible = true
}
const handleBeforeOk = () => {

}
</script>

<template>
  <Basic
    :show="selectedEvents.length > 0"
    ok-text="创建集合事件"
    @cancel="handleCancel"
    @ok="handleOk"
  >
    <AForm :model="model">
      <AFormItem>
        1
      </AFormItem>
    </AForm>
  </Basic>
</template>
