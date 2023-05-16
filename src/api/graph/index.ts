import { Message } from '@arco-design/web-vue'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import type { MaybeRef } from '@vueuse/shared'
import type { NodeIdDto, RelationEntity, RelationIdDto } from '../api-base'
import type { ApiError, MutationOptions } from '../types'
import api from '../api'
import { invalidateRelation } from './utils'

type RelationMutationOptions<
  T = RelationIdDto,
  D = RelationEntity[]
> = MutationOptions<T, D>

export const useNodeRelationsQuery = (node: MaybeRef<NodeIdDto | undefined>) =>
  useQuery({
    enabled: computed(() => unref(node) !== undefined),
    queryKey: computed(() => ['graph', 'node', 'relations', unref(node)]),
    queryFn: () => api.graph.getNodeRelations(unref(node)!),
    onError: (e: ApiError) => {
      Message.error(`获取关系数据失败：${e.response?.data.message}`)
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
      Message.error(`创建关系失败：${e.response?.data.message}`)
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
      Message.error(`删除关系失败：${e.response?.data.message}`)
      options?.onError?.(e, vars, ctx)
    },
  })
}
