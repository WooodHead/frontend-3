import mitt from 'mitt'
import type { EventEntity } from '@/api/api-base'

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type CustomEvents = {
  'event-select': { event: EventEntity }
  'reload': { }
}

const emitter = mitt<CustomEvents>()
export default emitter
