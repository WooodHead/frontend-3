<script setup lang="ts">
import './style.css'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import { EditorContent, useEditor } from '@tiptap/vue-3'
import BubbleMenu from './bubble-menu.vue'

const editor = useEditor({
  extensions: [
    StarterKit,
    Placeholder.configure({
      placeholder: '在这里写下事件梗概……',
    }),
  ],
  editorProps: {
    attributes: {
      class: 'outline-none',
    },
  },
})
</script>

<template>
  <div grow p-4 overflow-y-auto>
    <div column h-full>
      <BubbleMenu :editor="editor" />
      <EditorContent grow prose :editor="editor" />
    </div>
  </div>
</template>
