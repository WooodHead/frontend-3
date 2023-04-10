import { Message } from '@arco-design/web-vue'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import type { AxiosError } from 'axios'
import type { EventEntity, SummarizeDescDto } from '@/api/api-base'
import api from '@/api/api'
import { invalidateNode } from '@/api/graph/utils'
import { EVENT } from '@/api/graph/schema'

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
    onError: (e: AxiosError) => {
      Message.error(`生成失败：${e.message}`)
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
    onError: (e: AxiosError) => {
      Message.error(`更新失败：${e.message}`)
    },
  })
}

export const useUpdateChara = () => {
  const client = useQueryClient()
  return useMutation({
    mutationFn: ({ id }: { id: number }) => api.ai.updateChara(id),
    onSuccess: (_data, { id }) => {
      invalidateNode(client, { id, type: EVENT })
    },
    onError: (e: AxiosError) => {
      Message.error(`更新失败：${e.message}`)
    },
  })
}
