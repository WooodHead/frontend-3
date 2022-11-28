import type { QueryClientConfig } from '@tanstack/query-core'

const config: QueryClientConfig = {
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
}

export default config
