<script setup lang="ts">
import { Motion, Presence } from '@motionone/vue'
import NavigateNext from './buttons/navigate-next.vue'
import NavigatePrev from './buttons/navigate-prev.vue'
import Search from './buttons/search.vue'
import Create from './buttons/create.vue'

import { fadeInOutY } from '@/utils/animation'

const expand = ref(false)
</script>

<template>
  <div absolute right-4 bottom-4 center-y space-y-2 p-2>
    <Presence
      v-for="btn in [NavigateNext, NavigatePrev, Search, Create]"
      :key="btn.name"
    >
      <Motion v-if="expand" v-bind="fadeInOutY">
        <component :is="btn" />
      </Motion>
    </Presence>
    <AButton
      shadow-lg
      type="primary" size="large" shape="circle"
      @click="expand = !expand"
    >
      <div :class="expand ? 'i-radix-icons-triangle-down' : 'i-radix-icons-triangle-up'" text-4xl></div>
    </AButton>
  </div>
</template>
