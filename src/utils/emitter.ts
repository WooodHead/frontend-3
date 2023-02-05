import mitt from 'mitt'
import type { EventEntity } from '@/api/api-base'

type ReloadReason = {
  type: 'force'
} | {
  type: 'event'
  event: EventEntity
}

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type CustomEvents = {
  'event-select': { event: EventEntity }
  'reload': { reason: ReloadReason }
}

const emitter = mitt<CustomEvents>()
export default emitter
