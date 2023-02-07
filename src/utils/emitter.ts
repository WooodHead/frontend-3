import mitt from 'mitt'
import type { EventEntity } from '@/api/api-base'

type ReloadType =
{ type: 'all' } |
{ type: 'gantt'; context: EventEntity }

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type CustomEvents = {
  'event-select': { event: EventEntity }
  'reload': { reason: ReloadType }
}

const emitter = mitt<CustomEvents>()
export default emitter
