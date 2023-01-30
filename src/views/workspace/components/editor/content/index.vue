<script setup lang="ts">
import './style.css'
import type { EditorEvents } from '@tiptap/vue-3'
import { Editor, EditorContent } from '@tiptap/vue-3'
import { useQuery } from '@tanstack/vue-query'
import type { AxiosError } from 'axios'
import { Message } from '@arco-design/web-vue'
import { useStore } from '../store'
import BubbleMenu from './bubble-menu.vue'
import api from '@/api/api'

const store = useStore()
const { editor } = $(storeToRefs(store))

// 自上次保存后是否有修改，无则无需重复保存
let saved = $ref(true)
editor.on('update', () => { saved = false })
const handleEditorSave = (editor: Editor) => {
  if (!store.eventId || saved) { return }
  api.event.updateContent(store.eventId, {
    content: editor.getHTML(),
  }).then(() => {
    saved = true
  }).catch((e: AxiosError) => {
    Message.error(`保存失败：${e.message}`)
  })
}
// 输入后1秒或失去焦点时保存
editor.on('update', useDebounceFn(({ editor }: EditorEvents['update']) => handleEditorSave(editor as Editor), 1000))
editor.on('blur', ({ editor }: EditorEvents['blur']) => handleEditorSave(editor as Editor))

const { isSuccess, isLoading, isError } = useQuery({
  enabled: computed(() => store.eventId !== undefined),
  queryKey: computed(() => ['event', store.eventId, 'content']),
  queryFn: () => api.event.getContent(store.eventId!),
  onSuccess: ({ content }) => {
    editor.commands.setContent(content)
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
        <BubbleMenu />
        <EditorContent grow prose :editor="(editor as Editor)" />
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
