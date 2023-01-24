import mitt from 'mitt'

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type CustomEvents = {
  'event-select': { eventId: number }
}

const emitter = mitt<CustomEvents>()
export default emitter
