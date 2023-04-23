import type { SuggestionOptions } from '@tiptap/suggestion/src'
import { VueRenderer } from '@tiptap/vue-3'
import tippy from 'tippy.js'
import type { Instance, Props } from 'tippy.js'
import MentionList from './mention-list.vue'

export const suggestionConfig: Omit<SuggestionOptions, 'editor'> = {
  items: ({ query }) => {
    console.log(query)

    return ['a', 'b', 'c']
  },

  render: () => {
    let component: VueRenderer
    let popup: Instance<Props>[]
    return {
      onStart: (props) => {
        component = new VueRenderer(MentionList, {
          props: { suggestion: props },
          editor: props.editor,
        })

        const rect = props.clientRect?.()
        if (!rect) {
          return
        }

        popup = tippy('body', {
          getReferenceClientRect: () => rect,
          appendTo: () => document.body,
          content: component.element,
          showOnCreate: true,
          interactive: true,
          trigger: 'manual',
          placement: 'bottom-start',
        })
      },
      onUpdate: (props) => {
        component.updateProps({ suggestion: props })

        if (!props.clientRect) {
          return
        }

        const rect = props.clientRect?.()
        if (!rect) {
          return
        }
        popup[0].setProps({
          getReferenceClientRect: () => rect,
        })
      },

      onKeyDown: (props) => {
        if (props.event.key === 'Escape') {
          popup[0].hide()
          return true
        }

        return component.ref?.handleKeyDown(props)
      },

      onExit: () => {
        popup[0].destroy()
        component.destroy()
      },
    }
  },
}

export default suggestionConfig
