import type { ComponentStatus } from '../type'
import createStore from '@/utils/createStore'

export const { registerStore, useStore } = createStore('editor', {
  state: () => ({
    status: { id: 'default' } as (ComponentStatus | undefined),
    eventId: undefined as (number | undefined),
  }),
})
