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
      <AButton h-40px rounded-0 @click="handleExpand">
        <div class="i-radix-icons-hamburger-menu" text="2xl gray-500"></div>
      </AButton>
      <Presence>
        <DropArea v-show="WSStore.dragging" />
      </Presence>
      <div grow column justify-center w-full>
        <Handler id="gantt" name="时序图" :icon="GanttIcon" :dark-icon="GanttDarkIcon" />
        <Handler id="editor" name="编辑器" :icon="EditorIcon" :dark-icon="EditorDarkIcon" />
        <Handler id="graph" name="关系图" :icon="GraphIcon" :dark-icon="GraphDarkIcon" />
        <Handler id="characters" name="角色" :icon="CharactersIcon" :dark-icon="CharactersDarkIcon" />
      </div>
      <div center h="10%" w-full>
        <AButton shape="circle" type="secondary">
          <div w-30px h-30px m-1 i-radix-icons-person></div>
        </AButton>
      </div>
    </div>
  </div>
</template>
