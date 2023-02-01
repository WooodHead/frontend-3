import { ComponentStatus } from '../type'
import { editor } from './tiptap'
import createStore from '@/utils/createStore'
import emitter from '@/utils/emitter'

export const { registerStore, useStore } = createStore(
  'editor',
  {
    state: () => ({
      status: new ComponentStatus('default'),
      eventId: undefined as (number | undefined),
      editor,
    }),
  },
  store => {
    emitter.on('event-select', ({ event }) => {
      store.eventId = event.id
    })
  },
)
