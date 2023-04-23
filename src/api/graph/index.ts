import { Message } from '@arco-design/web-vue'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import type { MaybeRef } from '@vueuse/shared'
import { graphApi } from '../api'
import type { NodeIdDto, RelationEntity, RelationIdDto } from '../api-graph'
import type { ApiError, MutationOptions } from '../types'
import { invalidateRelation } from './utils'

type RelationMutationOptions<
  T = RelationIdDto,
  D = RelationEntity[]
> = MutationOptions<T, D>

export const useRelationsQuery = (node: MaybeRef<NodeIdDto | undefined>) =>
  useQuery({
    enabled: computed(() => unref(node) !== undefined),
    queryKey: computed(() => ['graph', 'relations', unref(node)]),
    queryFn: () => graphApi.relations.getRelations(unref(node)!),
    onError: (e: ApiError) => {
      Message.error(`获取关系数据失败：${e.response?.data.message}`)
    },
  })

export const useRelationCreate = (options?: RelationMutationOptions) => {
  const client = useQueryClient()
  return useMutation({
    ...options,
    mutationFn: (dto: RelationIdDto) => graphApi.relation.createRelation(dto),
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
    mutationFn: (dto: RelationIdDto) => graphApi.relation.removeRelation(dto),
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
