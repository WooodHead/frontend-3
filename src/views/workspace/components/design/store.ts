import type { ComponentStatus } from '../type'
import createStore from '@/utils/createStore'

export const { useStore, registerStore } = createStore('design', {
  state: () => ({
    status: { id: 'default' } as (ComponentStatus | undefined),
  }),
})
