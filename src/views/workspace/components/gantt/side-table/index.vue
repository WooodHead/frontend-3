<script setup lang="ts">
import { HEADER_HEIGHT } from '../const'
import { useStore } from '../store'
import EventItems from './event-items/index.vue'

const store = useStore()
const { lock } = $(storeToRefs(store))

// TODO 完成事件列表锁
</script>

<template>
  <div
    column
    h-full w="30%" min-w="20%" max-w="50%"
    rounded-l-lg shadow-lg
    resize-x overflow-x-hidden
    z-10 bg-bg-1
  >
    <div
      :style="{ height: `${HEADER_HEIGHT}px` }"
      column shrink-0 p-2
      border="b border-2"
    >
      <div grow center>
        {{ store.visibleUnit?.toString() }}
      </div>
      <ATooltip position="right" content="锁定事件">
        <AButton
          long h="40%"
          :type="lock ? `primary` : `secondary`"
          @click="lock = !lock"
        >
          <div v-if="lock" class="i-radix-icons-lock-closed"></div>
          <div v-else class="i-radix-icons-lock-open-1"></div>
        </AButton>
      </ATooltip>
    </div>
    <EventItems />
  </div>
</template>
