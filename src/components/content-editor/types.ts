import type { Ref } from 'vue'

export interface ContentEditorCommands {
  setContent: (content: string) => void
  count: Ref<number>
}
