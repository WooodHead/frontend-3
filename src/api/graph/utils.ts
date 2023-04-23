import type { QueryClient } from '@tanstack/vue-query'
import { graphApi } from '../api'
import type { NodeIdDto, RelationIdDto } from '../api-graph'
import type { RelationType } from './schema'
import { RelationSchema } from './schema'

export const invalidateRelation = (
  client: QueryClient,
  { type, from, to }: RelationIdDto
) => {
  const { from: fromType, to: toType } = RelationSchema[type]
  client.invalidateQueries(['graph', 'relations', { type: fromType, id: from }])
  client.invalidateQueries(['graph', 'relations', { type: toType, id: to }])
}

export const invalidateNode = async (client: QueryClient, dto: NodeIdDto) => {
  client.invalidateQueries(['graph', 'node', dto])
  const relations = await client.ensureQueryData({
    queryKey: ['graph', 'relations', dto],
    queryFn: () => graphApi.relations.getRelations(dto),
  })

  for (const type of Object.keys(relations) as RelationType[]) {
    const { from, to } = relations[type]
    const { from: fromType, to: toType } = RelationSchema[type]
    for (const id of from) {
      client.invalidateQueries(['graph', 'relations', { type: fromType, id }])
    }
    for (const id of to) {
      client.invalidateQueries(['graph', 'relations', { type: toType, id }])
    }
  }
}
