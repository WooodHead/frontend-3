import type { ComponentStatus } from '../type'
import createStore from '@/utils/createStore'

export const { registerStore, useStore } = createStore('graph', {
  state: () => ({
    status: { id: 'default' } as (ComponentStatus | undefined),
  }),
})
