import type { UnitID } from '@project-chiral/unit-system'
import createStore from '@/utils/createStore'

export const { registerStore, useStore } = createStore('gantt/time-bar', {
  state: () => ({
    blockQueue: [] as UnitID[],
    offset: 0,
    viewPort: null as (HTMLDivElement | null),
  }),

  actions: {
    init(origin: UnitID) {
      this.offset = 0
      this.blockQueue = [origin.clone()]
      this.loadLeft(20)
      this.loadRight(20)
    },

    loadLeft(count = 1) {
      const first = this.blockQueue[0]
      const prevs = Array(count).fill(0).map((_, i) => first.sub(count - i))
      this.blockQueue.unshift(...prevs)
      if (this.blockQueue.length > 100) { this.removeRight(count) }
    },

    loadRight(count = 1) {
      const last = this.blockQueue[this.blockQueue.length - 1]
      const nexts = Array(count).fill(0).map((_, i) => last.add(i + 1))
      this.blockQueue.push(...nexts)
      if (this.blockQueue.length > 100) { this.removeLeft(count) }
    },

    removeLeft(count = 1) {
      this.blockQueue.splice(0, count)
    },

    removeRight(count = 1) {
      this.blockQueue.splice(this.blockQueue.length - count)
    },
  },
})
