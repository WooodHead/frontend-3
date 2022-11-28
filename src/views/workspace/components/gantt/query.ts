import { createQueryKeys } from '@lukemorales/query-key-factory'
import { getAllEvents, getEvents, getEventsRange, getOrigin } from '@/api/gantt'

export default createQueryKeys('gantt', {
  origin: {
    queryKey: null,
    queryFn: getOrigin,
  },

  event: {
    queryKey: null,
    queryFn: getAllEvents,
    contextQueries: {
      start: (start: string) => ({
        queryKey: [start],
        queryFn: getEvents,
        contextQueries: {
          end: (end: string) => ({
            queryKey: [end],
            queryFn: getEventsRange,
          }),
        },
      }),
    },
  },
})
