<script setup lang="ts">
import { Motion, Presence } from '@motionone/vue'
import NavigateNext from './buttons/navigate-next.vue'
import NavigatePrev from './buttons/navigate-prev.vue'
import UnitUp from './buttons/unit-up.vue'
import UnitDown from './buttons/unit-down.vue'
import Search from './buttons/search.vue'
import Create from './buttons/create.vue'

let expand = $ref(false)

const handleExpand = () => {
  expand = !expand
}
</script>

<template>
  <div absolute right-4 bottom-4 center-y space-y-2>
    <Presence
      v-for="btn in [NavigateNext, NavigatePrev, UnitUp, UnitDown, Search, Create]"
      :key="btn.name"
    >
      <Motion
        v-show="expand"
        :initial="{ translateY: '100%', opacity: 0 }"
        :animate="{ translateY: '0px', opacity: 1 }"
        :exit="{ translateY: '100%', opacity: 0 }"
        :transition="{ duration: 0.2 }"
      >
        <component :is="btn" />
      </Motion>
    </Presence>
    <v-btn icon color="primary" size="large" @click="handleExpand">
      <div
        :class="expand ? `i-radix-icons-triangle-down` : `i-radix-icons-triangle-up`"
        text-4xl
      ></div>
    </v-btn>
  </div>
</template>
