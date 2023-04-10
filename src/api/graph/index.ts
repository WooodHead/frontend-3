import { Message } from '@arco-design/web-vue'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import type { MaybeRef } from '@vueuse/shared'
import type { AxiosError } from 'axios'
import api from '../api'
import type { NodeIdDto, RelationEntity, RelationIdDto } from '../api-base'
import type { MutationOptions } from '../types'
import { invalidateRelation } from './utils'

type RelationMutationOptions<T = RelationIdDto, D = RelationEntity> = MutationOptions<T, D>

export const useRelationsQuery = (node: MaybeRef<NodeIdDto | undefined>) => useQuery({
  enabled: computed(() => unref(node) !== undefined),
  queryKey: computed(() => ['graph', 'relations', unref(node)]),
  queryFn: () => api.graph.getRelations(unref(node)!),
  onError: (e: AxiosError) => {
    Message.error(`获取关系数据失败：${e.message}`)
  },
})

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
