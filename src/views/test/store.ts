export const useStore = defineStore('test', {
  state: () => ({
    array: [] as { fuck: number }[],
  }),
  actions: {
    push() {
      this.array.push({ fuck: Math.random() })
    },
  },
})
