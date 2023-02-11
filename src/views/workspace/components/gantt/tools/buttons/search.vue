<script setup lang="ts">
import Basic from './basic.vue'
import type { EventEntity } from '@/api/api-base'
import emitter from '@/utils/emitter'
const visible = ref(false)
const handleSelect = (event: EventEntity | undefined) => {
  if (!event) { return }
  emitter.emit('event-select', { event })
}
</script>

<template>
  <ATrigger
    v-model:popup-visible="visible"
    trigger="click"
    position="left"
    :popup-translate="[-10, 0]"
  >
    <Basic tooltip="搜索">
      <div i-radix-icons-magnifying-glass text-2xl></div>
    </Basic>
    <template #content>
      <div card-border p-2 right-2>
        <Selector
          event
          placeholder="跳转到指定事件"
          @select="visible = false"
          @select:event="handleSelect"
        />
      </div>
    </template>
  </ATrigger>
</template>
