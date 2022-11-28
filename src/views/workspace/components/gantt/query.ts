import { createQueryKeys } from '@lukemorales/query-key-factory'
import { getOrigin } from '@/api/gantt'

export default createQueryKeys('gantt', {
  origin: () => ({ queryKey: ['114514'], queryFn: getOrigin }),
})
