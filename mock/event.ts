import { UnitIDRange } from '@project-chiral/unit-system'
import type { MockMethod } from 'vite-plugin-mock'
import type { EventDetailEntity, EventEntity } from '../src/api/api-base'

export default [
  {
    method: 'get',
    url: '/api/event',
    response: ({ query }) => {
      if (!query) { return [] }
      return [
        {
          id: 1,
          name: 'Event 1',
          description: 'Event 1 description',
          type: 'ATOM',
          range: UnitIDRange.fromDayjs('2022-12-01', '2022-12-02', 'date').serialize(),
          createdAt: (new Date()).toISOString(),
          updatedAt: (new Date()).toISOString(),
          deletedAt: null,
          contentId: null,
          projectId: 1,
          color: '#93c5fd',
        },
      ] as EventEntity[]
    },
  },
  {
    method: 'get',
    url: '/api/event/:id/detail',
    response: ({ params }) => {
      // const { id } = params as { id: string }

      return {
        id: 1,
        name: 'Event 1',
        description: 'Event 1 description',
        type: 'ATOM',
        range: UnitIDRange.fromDayjs('2022-12-01', '2022-12-02', 'date').serialize(),
        createdAt: (new Date()).toISOString(),
        updatedAt: (new Date()).toISOString(),
        deletedAt: null,
        contentId: null,
        projectId: 1,
        color: '#93c5fd',
        superEvents: [],
        superGraphs: [],
        subGraphs: [],
      } as EventDetailEntity
    },
  },
] as MockMethod[]
