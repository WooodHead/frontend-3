import type { MockMethod } from 'vite-plugin-mock'
import { UnitID } from '@project-chiral/unit-system'

export default [
  {
    url: '/api/project/workspace',
    method: 'get',
    response: () => ({
      origin: UnitID.fromDayjs('2022-12-01', 'month').serialize(),
      layout: [
        {
          id: 'editor',
          position: [1, 2, 1, 3],
        },
        {
          id: 'gantt',
          position: [2, 3, 1, 3],
        },
      ],
    }),
  },
] as MockMethod[]
