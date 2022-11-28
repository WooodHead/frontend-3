<script setup lang="ts">
import { Presence } from '@motionone/vue'
import useWSStore from '../store'
import DropArea from './drop-area/index.vue'
import Handler from './component-handler.vue'

import Menu from './menu.vue'
import CharactersIcon from '@/assets/workspace/character.png'
import EditorIcon from '@/assets/workspace/editor.png'
import GanttIcon from '@/assets/workspace/gantt.png'
import TimelineIcon from '@/assets/workspace/timeline.png'

const WSStore = useWSStore()

let expand = $ref(false)
const handleExpand = () => {
  expand = !expand
}
</script>

<template>
  <div
    :class="`${!expand && `shadow-lg`}`"
    column shrink-0 relative
    w-16 h-full
    bg-gray-100
    z-50
  >
    <v-btn rounded-0 variant="text" height="5%" @click="handleExpand">
      <div class="i-radix-icons-hamburger-menu" text="2xl gray-500" />
    </v-btn>
    <Presence>
      <DropArea v-if="WSStore.dragging" />
    </Presence>
    <div w-full grow column justify-center>
      <Handler id="gantt" name="时序图">
        <img w-40px h-40px :src="GanttIcon">
      </Handler>
      <Handler id="editor" name="编辑器">
        <img w-40px h-40px :src="EditorIcon">
      </Handler>
      <Handler id="timeline" name="叙事线">
        <img w-40px h-40px :src="TimelineIcon">
      </Handler>
      <Handler id="characters" name="角色">
        <img w-40px h-40px :src="CharactersIcon">
      </Handler>
    </div>
    <div center h="10%" w-full>
      <v-btn icon color="#d1d5db">
        <div w-30px h-30px text-gray-100 i-radix-icons-person />
      </v-btn>
    </div>
  </div>
  <Menu :expand="expand" />
</template>
