<script setup lang="ts">
import './style.css'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import { EditorContent, useEditor } from '@tiptap/vue-3'

const editor = useEditor({
  content: '<p>I’m running Tiptap with Vue.js. 🎉</p>',
  extensions: [
    StarterKit,
    Placeholder.configure({
      placeholder: 'Waiting for some content...',
    }),
  ],
  editorProps: {
    attributes: {
      class: 'prose outline-none',
    },
  },
})
</script>

<template>
  <div grow p-4 overflow-y-scroll>
    <div column h-full>
      <EditorContent grow :editor="editor" />
    </div>
  </div>
</template>
