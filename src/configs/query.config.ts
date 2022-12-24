import type { QueryClientConfig } from '@tanstack/vue-query'

const config: QueryClientConfig = {
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
}

export default config
