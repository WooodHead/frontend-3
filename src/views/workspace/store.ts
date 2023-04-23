import { defineStore } from 'pinia'
import type { IPositionID } from './layout'
import { Layout } from './layout'

const useWSStore = defineStore({
  id: 'workspace',
  state: () => ({
    dragging: false,
    menuExpand: false,
    layout: new Layout(),
  }),
  getters: {
    components: (state) => state.layout.components,
  },
  actions: {
    insertComponent(handlerID: string, dropID: IPositionID) {
      this.layout.insert(handlerID, dropID)
    },
  },
})

export default useWSStore
