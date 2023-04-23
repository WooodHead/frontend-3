import type {
  DefineStoreOptions,
  StateTree,
  StoreDefinition,
  _GettersTree,
} from 'pinia'

/**
 * 创建拥有组件作用域的store
 *
 * 方法为：接收传入的id作为该组件的uid，创建一个新的store，将该store通过 `provide` 注入到组件中，组件内部通过 `inject` 获取该store
 * @returns registerStore: 注册store，在组件的index.vue中调用；useStore: 获取store，在组件的其他地方调用
 */
export const createStore = <
  Id extends string,
  Dis extends string,
  S extends StateTree = {},
  G extends _GettersTree<S> = {},
  A = {}
>(
  baseID: Id,
  options: Omit<DefineStoreOptions<Id, S, G, A>, 'id'>
) => {
  return {
    registerStore: (distinct: Dis) => {
      const useStore = defineStore(`${baseID}_${distinct}`, options)
      const store = useStore()

      provide(`store_${baseID}`, useStore)
      onUnmounted(() => {
        store.$dispose()
      })

      return store
    },
    useStore: () =>
      (inject(`store_${baseID}`) as StoreDefinition<string, S, G, A>)(),
  }
}

export default createStore
