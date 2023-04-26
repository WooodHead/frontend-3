<script setup lang="ts">
import StarterKit from '@tiptap/starter-kit'
import type { EditorEvents, Extensions } from '@tiptap/vue-3'
import { EditorContent, useEditor } from '@tiptap/vue-3'
import Document from '@tiptap/extension-document'
import CharacterCount from '@tiptap/extension-character-count'
import Placeholder from '@tiptap/extension-placeholder'
import { Motion, Presence } from '@motionone/vue'
import type { ContentEditorCommands } from './content-editor/types'
import { fadeInOut } from '@/utils/animation'

const {
  editable = true,
  cover = false,
  forceHeader = false,
  placeholder,
  characterCount,
  debounceTime = 1000,
} = defineProps<{
  editable?: boolean
  cover?: boolean
  forceHeader?: boolean
  placeholder?: string
  characterCount?: boolean
  debounceTime?: number
}>()

const emit = defineEmits<{
  (e: 'save', content: string): void | Promise<void>
  (e: 'change-cover', file: File): Promise<boolean>
}>()

const extensions: Extensions = [
  StarterKit.configure({
    document: forceHeader ? false : undefined,
    code: false,
    codeBlock: false,
    gapcursor: false,
  }),
  Placeholder.configure({
    showOnlyWhenEditable: false,
    placeholder: ({ node }) => {
      if (node.type.name === 'heading') {
        return '请输入标题'
      }
      return placeholder ?? '在这里输入内容'
    },
  }),
]
if (forceHeader) {
  extensions.push(
    Document.extend({
      content: 'heading block*',
    })
  )
}
if (characterCount) {
  extensions.push(CharacterCount)
}

const editor = useEditor({
  extensions,
  editorProps: {
    attributes: {
      class: 'outline-none subpixel-antialiased',
    },
  },
})

watchEffect(() => {
  editor.value?.setEditable(editable)
})

const handleDebouncedSave = useDebounceFn(
  (content: string) => emit('save', content),
  debounceTime,
  { maxWait: debounceTime * 10 }
)

editor.value?.on('update', ({ editor }: EditorEvents['update']) =>
  handleDebouncedSave(editor.getHTML())
)

const coverRef = ref<HTMLDivElement | null>(null)
const coverHover = useElementHover(coverRef)

const handleCoverChange = async (file: File) => {
  return await emit('change-cover', file)
}

const setContent = (content: string) => {
  editor.value?.commands.setContent(content)
}
const count = computed(
  () => editor.value?.storage.characterCount.characters() as number
)
defineExpose({
  setContent,
  count,
} as ContentEditorCommands)
</script>

<template>
  <div column>
    <div
      v-if="cover"
      ref="coverRef"
      relative
      h-100px
      w-full
      shrink-0
      overflow-hidden
    >
      <img
        full
        object-cover
        alt="dessert"
        src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a20012a2d4d5b9db43dfc6a01fe508c0.png~tplv-uwbnlip3yd-webp.webp"
      >
      <Presence>
        <Motion v-if="coverHover" v-bind="fadeInOut">
          <UploadButton
            absolute
            right-1
            bottom-1
            @before-upload="handleCoverChange"
          >
            <template #icon>
              <div i-radix-icons-image></div>
            </template>
          </UploadButton>
        </Motion>
      </Presence>
    </div>
    <div grow column p-4>
      <EditorContent prose :editor="editor" />
    </div>
  </div>
</template>
