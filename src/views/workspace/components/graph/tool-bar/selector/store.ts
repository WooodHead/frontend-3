import createStore from '@/utils/createStore'

export const { registerStore, useStore } = createStore('graph/selector', {
  state: () => ({

  }),
})