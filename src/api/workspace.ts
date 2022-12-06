import { createQueryKeys } from '@lukemorales/query-key-factory'
import api from './api'

export default createQueryKeys('workspace', {
  settings: {
    queryKey: null,
    // queryFn: api.workspace.get
  },
  layout: {
    queryKey: null,
    queryFn: api.workspace.getLayout,
  },
})
