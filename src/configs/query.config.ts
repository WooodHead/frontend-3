import type { QueryClientConfig } from '@tanstack/vue-query'

const config: QueryClientConfig = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      suspense: true,
      staleTime: 1000 * 60 * 5,
    },
  },
}

export default config
