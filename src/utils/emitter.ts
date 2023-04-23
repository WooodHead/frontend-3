import mitt from 'mitt'

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type CustomEvents = {
  'event-select': { id: number }
  reload: {}
}

const emitter = mitt<CustomEvents>()
export default emitter
