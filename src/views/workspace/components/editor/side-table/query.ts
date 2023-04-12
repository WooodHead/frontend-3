import { Message } from '@arco-design/web-vue'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import type { EventEntity, SummarizeDescDto } from '@/api/api-base'
import api from '@/api/api'
import { EVENT } from '@/api/graph/schema'
import type { ApiError } from '@/api/types'
import { invalidateNode } from '@/api/graph/utils'

export const useUpdateDesc = () => {
  const client = useQueryClient()
  return useMutation({
    mutationFn: ({ id, ...dto }: SummarizeDescDto & { id: number }) =>
      api.ai.updateEventDesc(id, dto),
    onSuccess: (description, { id }) => {
      client.setQueryData<EventEntity>(
        ['event', id],
        event => event && ({
          ...event,
          description,
        }))
    },
    onError: (e: ApiError) => {
      Message.error(`生成失败：${e.response?.data.message}`)
    },
  })
}

export const useUpdateName = () => {
  const client = useQueryClient()
  return useMutation({
    mutationFn: ({ id }: { id: number }) =>
      api.ai.updateEventName(id),
    onSuccess: (name, { id }) => {
      client.setQueryData<EventEntity>(
        ['event', id],
        event => event && ({
          ...event,
          name,
        }))
    },
    onError: (e: ApiError) => {
      Message.error(`更新失败：${e.response?.data.message}`)
    },
  })
}

export const useUpdateChara = () => {
  const client = useQueryClient()
  return useMutation({
    mutationFn: ({ id }: { id: number }) => api.ai.updateChara(id),
    onSuccess: async (data, { id }) => {
      client.setQueryData<EventEntity>(
        ['event', id],
        event => event && ({
          ...event,
          unresolved: data.unresolved,
        }),
      )
      invalidateNode(client, { id, type: EVENT })
    },
    onError: (e: ApiError) => {
      Message.error(`更新失败：${e.response?.data.message}`)
    },
  })
}
