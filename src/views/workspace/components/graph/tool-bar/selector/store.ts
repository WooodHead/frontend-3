import type { SelectorOptionValue } from '@/components/selector/value'
import createStore from '@/utils/createStore'

export const { registerStore, useStore } = createStore('graph/selector', {
  state: () => ({
    subject: undefined as (SelectorOptionValue | undefined),
  }),
})
