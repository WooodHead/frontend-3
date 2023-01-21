<script setup lang="ts">
import { Presence } from '@motionone/vue'
import useWSStore from '../store'
import DropArea from './drop-area/index.vue'
import Handler from './handler.vue'
import Menu from './menu.vue'

import DesignIcon from '@/assets/workspace/design.png'
import DesignDarkIcon from '@/assets/workspace/design-dark.png'
import EditorIcon from '@/assets/workspace/editor.png'
import EditorDarkIcon from '@/assets/workspace/editor-dark.png'
import GanttIcon from '@/assets/workspace/gantt.png'
import GanttDarkIcon from '@/assets/workspace/gantt-dark.png'
import GraphIcon from '@/assets/workspace/graph.png'
import GraphDarkIcon from '@/assets/workspace/graph-dark.png'

const router = useRouter()

const WSStore = useWSStore()
let { menuExpand } = $(storeToRefs(WSStore))

const handleClickOutside = () => { menuExpand = false }
</script>

<template>
  <div v-click-outside="handleClickOutside" h-full>
    <Menu />
    <div
      :class="!menuExpand && `shadow-lg`"
      column shrink-0 relative
      w-16 h-full
      bg-gray-2
      z-50
    >
      <AButton
        h-40px rounded-0
        @click="menuExpand = !menuExpand"
      >
        <div i-radix-icons-hamburger-menu text="2xl gray-6"></div>
      </AButton>
      <Presence>
        <DropArea v-if="WSStore.dragging" />
      </Presence>
      <div grow column justify-center w-full>
        <Handler id="gantt" name="时序图" :icon="GanttIcon" :dark-icon="GanttDarkIcon" />
        <Handler id="editor" name="编辑器" :icon="EditorIcon" :dark-icon="EditorDarkIcon" />
        <Handler id="graph" name="关系图" :icon="GraphIcon" :dark-icon="GraphDarkIcon" />
        <Handler id="design" name="设定" :icon="DesignIcon" :dark-icon="DesignDarkIcon" />
      </div>
      <div center h-10per w-full>
        <AButton
          shape="circle"
          type="secondary"
          @click="router.push({ name: 'ws-user' })"
        >
          <div w-30px h-30px i-radix-icons-avatar></div>
        </AButton>
      </div>
    </div>
  </div>
</template>
