import type { DefineStoreOptions, StateTree, StoreDefinition, _GettersTree } from 'pinia'

export default
<Id extends string, S extends StateTree = {}, G extends _GettersTree<S> = {}, A = {}>
(baseID: Id, options: Omit<DefineStoreOptions<Id, S, G, A>, 'id'>) => {
  return {
    registerStore: (id: string) => {
      const useStore = defineStore(`${baseID}_${id}`, options)

      provide(`store_${baseID}`, useStore)
      onUnmounted(() => {
        useStore().$dispose()
      })

      return useStore()
    },
    useStore: () => (inject(`store_${baseID}`) as StoreDefinition<string, S, G, A>)(),
  }
}
