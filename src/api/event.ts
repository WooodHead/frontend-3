import { Message } from '@arco-design/web-vue'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import api from './api'
import type { CreateEventDto, EventEntity, UpdateEventDto } from './api-base'
import { invalidateNode } from './graph/utils'
import { EVENT } from './graph/schema'
import type { MutationOptions } from './types'

type EventMutationOptions<T = void, D = EventEntity> = MutationOptions<T, D>

export const useEventCreate = (options?: EventMutationOptions<CreateEventDto>) => {
  const client = useQueryClient()
  return useMutation({
    ...options,
    mutationFn: (dto: CreateEventDto) => api.event.create(dto),
    onSuccess: (event, vars, ctx) => {
      Message.success('创建事件成功')
      client.setQueryData(['event', event.id], event)
      client.invalidateQueries(['event', 'list'])
      options?.onSuccess?.(event, vars, ctx)
    },
    onError: (e, vars, ctx) => {
      Message.error(`创建事件失败：${e.message}`)
      options?.onError?.(e, vars, ctx)
    },
  })
}

type Update = UpdateEventDto & { id: number }
export const useEventUpdate = (options?: EventMutationOptions<Update>) => {
  const client = useQueryClient()
  return useMutation({
    ...options,
    mutationFn: ({ id, ...dto }) => api.event.update(id, dto),
    onSuccess: (event, vars, ctx) => {
      client.invalidateQueries(['event', vars.id])
      client.invalidateQueries(['event', 'list'])
      options?.onSuccess?.(event, vars, ctx)
    },
    onError: (e, vars, ctx) => {
      Message.error(`更新事件失败：${e.message}`)
      options?.onError?.(e, vars, ctx)
    },
  })
}

interface Remove { id: number }
export const useEventRemove = (options?: EventMutationOptions<Remove>) => {
  const client = useQueryClient()
  return useMutation({
    ...options,
    mutationFn: ({ id }) => api.event.remove(id),
    onSuccess: (event, vars, ctx) => {
      Message.success('删除事件成功')
      client.removeQueries(['event', vars.id])
      client.invalidateQueries(['event', 'list'])
      invalidateNode(client, { type: EVENT, id: vars.id })
      options?.onSuccess?.(event, vars, ctx)
    },
    onError: (e, vars, ctx) => {
      Message.error(`删除事件失败：${e.message}`)
      options?.onError?.(e, vars, ctx)
    },
  })
}
