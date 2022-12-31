<script setup lang="ts">
import { Presence } from '@motionone/vue'
import useWSStore from '../store'
import DropArea from './drop-area/index.vue'
import Handler from './component-handler.vue'
import Menu from './menu.vue'

import CharactersIcon from '@/assets/workspace/character.png'
import CharactersDarkIcon from '@/assets/workspace/character-dark.png'
import EditorIcon from '@/assets/workspace/editor.png'
import EditorDarkIcon from '@/assets/workspace/editor-dark.png'
import GanttIcon from '@/assets/workspace/gantt.png'
import GanttDarkIcon from '@/assets/workspace/gantt-dark.png'
import GraphIcon from '@/assets/workspace/graph.png'
import GraphDarkIcon from '@/assets/workspace/graph-dark.png'
import { useGlobalStore } from '@/store'

const WSStore = useWSStore()
let { menuExpand } = $(storeToRefs(WSStore))

const globalStore = useGlobalStore()
const { darkMode } = $(storeToRefs(globalStore))

const handleExpand = () => { menuExpand = !menuExpand }
const handleClickOutside = () => { menuExpand = false }
</script>

<template>
  <div v-click-outside="handleClickOutside" h-full>
    <Menu :expand="menuExpand" />
    <div
      :class="!menuExpand && `shadow-lg`"
      column shrink-0 relative
      w-16 h-full
      bg-gray-2
      z-50
    >
      <!-- <v-btn rounded-0 variant="text" height="5%" @click="handleExpand">
        <div class="i-radix-icons-hamburger-menu" text="2xl gray-500"></div>
      </v-btn> -->
      <AButton h-40px rounded-0 @click="handleExpand">
        <div class="i-radix-icons-hamburger-menu" text="2xl gray-500"></div>
      </AButton>
      <Presence>
        <DropArea v-show="WSStore.dragging" />
      </Presence>
      <div grow column justify-center w-full>
        <Handler id="gantt" name="时序图">
          <img w-40px h-40px :src="darkMode ? GanttDarkIcon : GanttIcon">
        </Handler>
        <Handler id="editor" name="编辑器">
          <img w-40px h-40px :src="darkMode ? EditorDarkIcon : EditorIcon">
        </Handler>
        <Handler id="graph" name="关系图">
          <img w-40px h-40px :src="darkMode ? GraphDarkIcon : GraphIcon">
        </Handler>
        <Handler id="characters" name="角色">
          <img w-40px h-40px :src="darkMode ? CharactersDarkIcon : CharactersIcon">
        </Handler>
      </div>
      <div center h="10%" w-full>
        <v-btn flat icon color="#d1d5db">
          <div w-30px h-30px text-gray-100 i-radix-icons-person></div>
        </v-btn>
      </div>
    </div>
  </div>
</template>
