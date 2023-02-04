<script setup lang="ts">
import { BubbleMenu, Editor } from '@tiptap/vue-3'
import { useStore } from '../store'

const store = useStore()
const { editor } = $(storeToRefs(store))
// TODO 完成浮动菜单

const commands = [
  { icon: 'i-radix-icons-font-bold', command: () => editor.commands.toggleBold() },
  { icon: 'i-radix-icons-font-italic', command: () => editor.commands.toggleItalic() },
]
</script>

<template>
  <BubbleMenu
    v-if="editor"
    :tippy-options="{ duration: 100 }"
    :editor="(editor as Editor)"
  >
    <div card-border row overflow-hidden>
      <AButton
        v-for="{ icon, command } of commands"
        :key="icon"
        type="text"
        rounded-0 text-text-1
        @click="command"
      >
        <template #icon>
          <div :key="icon" :class="`${icon}`" text-xl></div>
        </template>
      </AButton>
    </div>
  </BubbleMenu>
</template>
