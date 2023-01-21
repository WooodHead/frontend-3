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
  <div column w-0 grow overflow-y-auto>
    <div h-120px w-full shrink-0 overflow-hidden>
      <img
        :style="{ transform: 'translateY(-50px)' }"
        alt="dessert"
        src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a20012a2d4d5b9db43dfc6a01fe508c0.png~tplv-uwbnlip3yd-webp.webp"
      >
    </div>
    <div column p-4>
      <BubbleMenu :editor="editor" />
      <EditorContent grow prose :editor="editor" />
    </div>
  </div>
</template>
