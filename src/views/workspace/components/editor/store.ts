import type { ComponentStatus } from '../type'
import { editor } from './tiptap'
import createStore from '@/utils/createStore'
import emitter from '@/utils/emitter'

export const { registerStore, useStore } = createStore(
  'editor',
  {
    state: () => ({
      status: { id: 'default' } as (ComponentStatus | undefined),
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
