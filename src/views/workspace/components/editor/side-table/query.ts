import { Message } from '@arco-design/web-vue'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import type { EventEntity } from '@/api/api-base'
import { aiApi } from '@/api/api'
import { EVENT } from '@/api/graph/schema'
import type { ApiError } from '@/api/types'
import { invalidateNode } from '@/api/graph/utils'
import type { SummarizeDescParams } from '@/api/api-ai'

export const useGenerateDesc = () => {
  const client = useQueryClient()
  return useMutation({
    mutationFn: ({ id, ...dto }: SummarizeDescParams & { id: number }) =>
      aiApi.summarize.desc(id, dto),
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
    mutationFn: ({ id }: { id: number }) => aiApi.summarize.title(id),
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

export const useResolveChara = () => {
  const client = useQueryClient()
  return useMutation({
    mutationFn: ({ id }: { id: number }) => aiApi.chara.resolve(id),
    onSuccess: async (data, { id }) => {
      client.setQueryData(['ai', 'chara', id], data)
      await invalidateNode(client, { id, type: EVENT })
    },
    onError: (e: ApiError) => {
      Message.error(`更新失败：${e.response?.data.message}`)
    },
  })
}
