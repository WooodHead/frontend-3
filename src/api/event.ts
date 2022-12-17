import { createQueryKeys } from '@lukemorales/query-key-factory'
import type { UnitIDRange } from '@project-chiral/unit-system'
import api from './api'

const eventQuery = {
  ...api.event,
  ...createQueryKeys('event', {
    all: {
      queryKey: null,
      queryFn: () => api.event.getEvents(),
    },
    id: (id: number) => ({
      queryKey: [id],
      queryFn: () => api.event.getEvents({ ids: [id] }),
      contextQueries: {
        detail: {
          queryKey: null,
          queryFn: api.event.getEventDetail(id),
        },
      },
    }),
    range: (range?: UnitIDRange) => ({
      queryKey: [range?.serialize() ?? ''],
      queryFn: () => api.event.getEvents({ range: range?.serialize() }),
      contextQueries: {
        ids: (ids: number[]) => ({
          queryKey: [ids.sort()],
          queryFn: () => api.event.getEvents({ range: range?.serialize(), ids }),
        }),
      },
    }),
  }),
}
export default eventQuery
