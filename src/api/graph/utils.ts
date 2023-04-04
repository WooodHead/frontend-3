import type { QueryClient } from '@tanstack/vue-query'
import api from '../api'
import type { NodeIdDto, RelationIdDto } from '../api-base'
import type { RelationType } from './schema'
import { RelationSchema } from './schema'

export const invalidateRelation = (client: QueryClient, { type, from, to }: RelationIdDto) => {
  const { from: fromType, to: toType } = RelationSchema[type]
  client.invalidateQueries(['graph', 'relation', 'all', { type: fromType, id: from }])
  client.invalidateQueries(['graph', 'relation', 'all', { type: toType, id: to }])

  // client.setQueryData<RelationsEntity>(['graph', 'relation', 'all', { type: fromType, id: from }], data => data && ({
  //   ...data,
  //   [type]: {
  //     ...data[type],
  //     to: data[type].to.filter(id => id !== to),
  //   },
  // }))
  // client.setQueryData<RelationsEntity>(['graph', 'relation', 'all', { type: toType, id: to }], data => data && ({
  //   ...data,
  //   [type]: {
  //     ...data[type],
  //     from: data[type].from.filter(id => id !== from),
  //   },
  // }))
}

export const invalidateNode = async (client: QueryClient, dto: NodeIdDto) => {
  const relations = await client.ensureQueryData({
    queryKey: ['graph', 'relation', 'all', dto],
    queryFn: () => api.graph.getRelations(dto),
  })

  for (const type of Object.keys(relations) as RelationType[]) {
    const { from, to } = relations[type]
    const { from: fromType, to: toType } = RelationSchema[type]
    for (const id of from) {
      client.invalidateQueries(['graph', 'relation', 'all', { type: fromType, id }])
    }
    for (const id of to) {
      client.invalidateQueries(['graph', 'relation', 'all', { type: toType, id }])
    }
  }
}

