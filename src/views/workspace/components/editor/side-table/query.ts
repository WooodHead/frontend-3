import { Message } from '@arco-design/web-vue'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import type { EventEntity, SummarizeDescParams } from '@/api/api-base'
import api from '@/api/api'
import { EVENT } from '@/api/graph/schema'
import type { ApiError } from '@/api/types'
import { invalidateNode } from '@/api/graph/utils'

export const useGenerateDesc = () => {
  const client = useQueryClient()
  return useMutation({
    mutationFn: ({ id, ...dto }: SummarizeDescParams & { id: number }) =>
      api.ai.summarizeDesc(id, dto),
    onSuccess: (description, { id }) => {
      client.setQueryData<EventEntity>(
        ['event', id],
        (event) => event && { ...event, description }
      )
    },
    onError: (e: ApiError) => {
      Message.error(`生成失败：${e.response?.data.message}`)
    },
  })
}

export const useGenerateName = () => {
  const client = useQueryClient()
  return useMutation({
    mutationFn: ({ id }: { id: number }) => api.ai.summarizeTitle(id),
    onSuccess: (name, { id }) => {
      client.setQueryData<EventEntity>(
        ['event', id],
        (event) => event && { ...event, name }
      )
    },
    onError: (e: ApiError) => {
      Message.error(`更新失败：${e.response?.data.message}`)
    },
  })
}

export const useUpdateChara = () => {
  const client = useQueryClient()
  return useMutation({
    mutationFn: ({ id }: { id: number }) => api.ai.resolveEntities(id),
    onSuccess: async (data, { id }) => {
      client.setQueryData<EventEntity>(
        ['event', id],
        (event) => event && { ...event, unresolved: data }
      )
      invalidateNode(client, { id, type: EVENT })
    },
    onError: (e: ApiError) => {
      Message.error(`更新失败：${e.response?.data.message}`)
    },
  })
}
