import { createQueryKeys } from '@lukemorales/query-key-factory'

export default createQueryKeys('editor', {
  content: (id: string) => ({
    queryKey: [id],
    queryFn: () => {},
  }),
})
