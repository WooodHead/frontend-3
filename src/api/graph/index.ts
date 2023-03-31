import { Message } from '@arco-design/web-vue'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import api from '../api'
import type { RelationEntity, RelationIdDto } from '../api-base'
import type { MutationOptions } from '../types'
import { invalidateRelation } from './utils'

type RelationMutationOptions<T = RelationIdDto, D = RelationEntity> = MutationOptions<T, D>

export const useRelationCreate = (options?: RelationMutationOptions) => {
  const client = useQueryClient()
  return useMutation({
    ...options,
    mutationFn: (dto: RelationIdDto) => api.graph.createRelation(dto),
    onSuccess: (data, vars, ctx) => {
      invalidateRelation(client, vars)
      options?.onSuccess?.(data, vars, ctx)
    },
    onError: (e, vars, ctx) => {
      Message.error('')
      options?.onError?.(e, vars, ctx)
    },
  })
}

export const useRelationRemove = (options?: RelationMutationOptions) => {
  const client = useQueryClient()
  return useMutation({
    ...options,
    mutationFn: (dto: RelationIdDto) => api.graph.removeRelation(dto),
    onSuccess: (data, vars, ctx) => {
      invalidateRelation(client, vars)
      options?.onSuccess?.(data, vars, ctx)
    },
    onError: (e, vars, ctx) => {
      Message.error('')
      options?.onError?.(e, vars, ctx)
    },
  })
}
