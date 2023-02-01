import { ComponentStatus } from '../type'
import createStore from '@/utils/createStore'

export const { useStore, registerStore } = createStore('design', {
  state: () => ({
    status: new ComponentStatus('default'),
  }),
})
