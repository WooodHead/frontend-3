import { createQueryKeys } from '@lukemorales/query-key-factory'
import api from './api'

export const setOrigin = api.workspace.setGanttOrigin

export default createQueryKeys('gantt', {
  origin: {
    queryKey: null,
    // TODO queryFn: api.workspace.getGanttOrigin,
    queryFn: () => Promise.resolve('32022_09'),
  },
})
