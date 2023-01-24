<script setup lang="ts">
import './style.css'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import type { EditorEvents } from '@tiptap/vue-3'
import { EditorContent, useEditor } from '@tiptap/vue-3'
import { useQuery } from '@tanstack/vue-query'
import type { AxiosError } from 'axios'
import { Message } from '@arco-design/web-vue'
import { useStore } from '../store'
import BubbleMenu from './bubble-menu.vue'
import api from '@/api/api'

const store = useStore()

const editor = $(useEditor({
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
  onUpdate: useDebounceFn(({ editor }: EditorEvents['update']) => {
    if (!store.eventId) { return }
    api.event.updateContent(store.eventId, {
      content: editor.getHTML(),
    }).catch((e: AxiosError) => {
      Message.error(`保存失败：${e.message}`)
    })
  }, 1000),
}))
const { isSuccess, isLoading, isError } = useQuery({
  enabled: computed(() => store.eventId !== undefined),
  queryKey: computed(() => ['event', store.eventId, 'content']),
  queryFn: () => api.event.getContent(store.eventId!),
  onSuccess: ({ content }) => {
    editor?.commands.setContent(content)
  },
  onError: (e: AxiosError) => {
    Message.error(`获取内容失败：${e.message}`)
  },
})
</script>

<template>
  <div column w-0 grow overflow-y-auto>
    <div v-if="isSuccess">
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
    <Status
      v-else
      :empty="store.eventId === undefined"
      :loading="isLoading"
      :error="isError"
    />
  </div>
</template>
