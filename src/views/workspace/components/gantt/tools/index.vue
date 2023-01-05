<script setup lang="ts">
import { Motion, Presence } from '@motionone/vue'
import NavigateNext from './buttons/navigate-next.vue'
import NavigatePrev from './buttons/navigate-prev.vue'
import UnitUp from './buttons/unit-up.vue'
import UnitDown from './buttons/unit-down.vue'
import Search from './buttons/search.vue'
import Create from './buttons/create.vue'

import { fadeInOutY } from '@/utils/animation'

let expand = $ref(false)

const handleExpand = () => { expand = !expand }
</script>

<template>
  <div absolute right-4 bottom-4 center-y space-y-2 p-2>
    <Presence
      v-for="btn in [NavigateNext, NavigatePrev, UnitUp, UnitDown, Search, Create]"
      :key="btn.name"
    >
      <Motion v-if="expand" v-bind="fadeInOutY">
        <component :is="btn" />
      </Motion>
    </Presence>
    <AButton type="primary" size="large" shape="circle" @click="handleExpand">
      <div :class="expand ? `i-radix-icons-triangle-down` : `i-radix-icons-triangle-up`" text-4xl></div>
    </AButton>
  </div>
</template>
