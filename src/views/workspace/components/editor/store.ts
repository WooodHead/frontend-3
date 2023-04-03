import { ComponentStatus } from '../type'
import { editor } from './tiptap'
import createStore from '@/utils/createStore'

export const { registerStore, useStore } = createStore(
  'editor',
  {
    state: () => ({
      status: new ComponentStatus('default'),
      eventId: undefined as (number | undefined),
      editor,
      saving: false,
      infoDot: false,
      relationDot: false,
      todoDot: false,
    }),
  })
