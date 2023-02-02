import type { SelectorOptionValue } from '@/components/selector/value'
import createStore from '@/utils/createStore'

export const { registerStore, useStore } = createStore('graph/selector', {
  state: () => ({
    object: undefined as (SelectorOptionValue | undefined),
  }),
})
