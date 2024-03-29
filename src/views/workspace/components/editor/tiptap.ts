import { Editor } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import CharacterCount from '@tiptap/extension-character-count'
import Mention from '@tiptap/extension-mention'
import suggestion from './components/mention'

export const editor = new Editor({
  extensions: [
    StarterKit.configure({
      code: false,
      codeBlock: false,
      gapcursor: false,
    }),
    Placeholder.configure({
      placeholder: '在这里写下事件描述……',
    }),
    CharacterCount,
    Mention.configure({
      renderLabel: () => '114514',
      suggestion,
    }),
  ],
  editorProps: {
    attributes: {
      class: 'outline-none subpixel-antialiased',
    },
  },
})

export default editor
