import type { QueryClient } from '@tanstack/vue-query'
import api from '../api'
import type { NodeIdDto, RelationIdDto } from '../api-base'
import type { RelationType } from './schema'
import { RelationSchema } from './schema'

export const invalidateRelation = (client: QueryClient, { from, to }: RelationIdDto) => {
  client.invalidateQueries(['graph', 'relation', 'all', from])
  client.invalidateQueries(['graph', 'relation', 'all', to])
}

export const invalidateNode = async (client: QueryClient, dto: NodeIdDto) => {
  const relations = await client.ensureQueryData({
    queryKey: ['graph', 'relation', 'all', dto],
    queryFn: () => api.graph.getRelations(dto),
  })

  for (const type of Object.keys(relations) as RelationType[]) {
    const { from, to } = relations[type]
    const fromType = RelationSchema[type].from
    const toType = RelationSchema[type].to
    for (const id of from) {
      client.invalidateQueries(['graph', 'relation', 'all', { type: fromType, id }])
    }
    for (const id of to) {
      client.invalidateQueries(['graph', 'relation', 'all', { type: toType, id }])
    }
  }
}

