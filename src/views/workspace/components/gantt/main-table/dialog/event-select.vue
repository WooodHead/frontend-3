<script setup lang="ts">
import { useStore } from '../../store'
import Basic from './basic.vue'

const store = useStore()
const { selectedEvents } = storeToRefs(store)

const visible = ref(false)

const init = computed(() => Array.from(selectedEvents.value))
</script>

<template>
  <Basic
    :show="selectedEvents.size > 0"
    ready
    ok-text="创建集合事件"
    @cancel="selectedEvents.clear()"
    @ok="visible = true"
  >
    <div border="~ border-2" w-full max-h-400px gap-0 overflow-y-auto>
      <EventItem v-for="id in selectedEvents" :id="id" :key="id" button />
    </div>
  </Basic>
  <CreateEventModal
    v-model:visible="visible"
    :init="init"
    @ok="selectedEvents.clear()"
  />
</template>
