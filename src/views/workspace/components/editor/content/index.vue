<script setup lang="ts">
import type { EditorEvents } from '@tiptap/vue-3'
import { Editor, EditorContent } from '@tiptap/vue-3'
import { useQuery, useQueryClient } from '@tanstack/vue-query'
import { Message } from '@arco-design/web-vue'
import { useStore } from '../store'
import BubbleMenu from './bubble-menu.vue'
import api from '@/api/api'
import type { ApiError } from '@/api/types'

const store = useStore()
const { editor, eventId } = storeToRefs(store)

const client = useQueryClient()

// 自上次保存后是否有修改，无则无需重复保存
const saved = ref(true)
editor.value.on('update', () => {
  if (saved.value) {
    saved.value = false
  }
})
const handleSave = (eventId: number | undefined, content: string) => {
  if (!eventId || saved.value) {
    return
  }
  store.saving = true
  api.event
    .updateContent(eventId, { content })
    .then((content) => {
      saved.value = true
      client.setQueryData(['event', eventId, 'content'], content)
    })
    .catch((e: ApiError) => {
      Message.error(`保存失败：${e.response?.data.message}`)
    })
    .finally(() => {
      store.saving = false
    })
}

const handleDebouncedSave = useDebounceFn(handleSave, 1000, { maxWait: 10000 })

// 输入后1秒或失去焦点时保存
editor.value.on(
  'update',
  useDebounceFn(({ editor }: EditorEvents['update']) =>
    handleDebouncedSave(eventId.value, editor.getHTML())
  )
)
editor.value.on('blur', ({ editor }: EditorEvents['blur']) =>
  handleSave(eventId.value, editor.getHTML())
)

const {
  data: content,
  isSuccess,
  isLoading,
  isError,
} = useQuery({
  enabled: computed(() => eventId.value !== undefined),
  queryKey: computed(() => ['event', eventId.value, 'content']),
  queryFn: () => api.event.getContent(eventId.value!),
  onError: (e: ApiError) => {
    Message.error(`获取内容失败：${e.response?.data.message}`)
  },
})
watch(content, (newContent, oldContent) => {
  // 自动保存时设置cache，导致data改变，导致此watch触发；
  // 如果不增加此判断，则用户可能在自动保存请求发送期间输入新内容，而上述过程将会把新内容覆盖为旧内容
  if (oldContent?.eventId === newContent?.eventId || !newContent) {
    return
  }
  editor.value.commands.setContent(newContent.content)
})

const handleSet = () => {
  editor.value.commands.setContent(
    '<p><span data-type="mention" data-id="@1">114514</span></p>'
  )
}
</script>

<template>
  <div full column overflow-y-auto>
    <div v-if="isSuccess" column h-full>
      <div h-120px w-full shrink-0 overflow-hidden>
        <img
          full
          object-cover
          alt="dessert"
          src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a20012a2d4d5b9db43dfc6a01fe508c0.png~tplv-uwbnlip3yd-webp.webp"
        />
      </div>
      <div grow column p-4>
        <BubbleMenu />
        <EditorContent grow prose :editor="(editor as Editor)" />
      </div>
    </div>
    <Status
      v-else
      :empty="eventId === undefined"
      :loading="isLoading"
      :error="isError"
    />
  </div>
</template>
