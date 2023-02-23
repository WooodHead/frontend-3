import { Message } from '@arco-design/web-vue'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import type { MaybeRef } from '@vueuse/shared'
import api from './api'
import type { CreateEventDto, EventEntity, UpdateEventDto } from './api-base'
import type { MutationOptions } from './types'

type EventMutationOptions<T = void, D = EventEntity> = MutationOptions<T, D>

export const useEventCreate = (options?: EventMutationOptions<CreateEventDto>) => {
  const client = useQueryClient()
  return useMutation({
    ...options,
    mutationFn: (dto: CreateEventDto) => api.event.create(dto),
    onSuccess: (event, vars, ctx) => {
      Message.success('创建事件成功')
      client.setQueryData(['event', unref(event.id)], event)
      client.invalidateQueries(['event', 'list'])
      options?.onSuccess?.(event, vars, ctx)
    },
    onError: (e, vars, ctx) => {
      Message.error(`创建事件失败：${e.message}`)
      options?.onError?.(e, vars, ctx)
    },
  })
}

export const useEventUpdate = (id: MaybeRef<number | undefined>, options?: EventMutationOptions<UpdateEventDto>) => {
  const client = useQueryClient()
  return useMutation({
    ...options,
    mutationFn: (dto: UpdateEventDto) => api.event.update(unref(id)!, dto),
    onSuccess: (event, vars, ctx) => {
      Message.success('更新事件成功')
      client.setQueryData(['event', unref(id)], event)
      client.invalidateQueries(['event', 'list'])
      options?.onSuccess?.(event, vars, ctx)
    },
    onError: (e, vars, ctx) => {
      Message.error(`更新事件失败：${e.message}`)
      options?.onError?.(e, vars, ctx)
    },
  })
}

export const useEventRemove = (id: MaybeRef<number | undefined>, options?: EventMutationOptions<void, EventEntity[]>) => {
  const client = useQueryClient()
  return useMutation({
    ...options,
    mutationFn: () => api.event.remove(unref(id)!, { cascade: false }),
    onSuccess: (events, vars, ctx) => {
      Message.success('删除事件成功')
      for (const event of events) {
        client.removeQueries(['event', event.id])
      }
      client.invalidateQueries(['event', 'list'])
      options?.onSuccess?.(events, vars, ctx)
    },
    onError: (e, vars, ctx) => {
      Message.error(`删除事件失败：${e.message}`)
      options?.onError?.(e, vars, ctx)
    },
  })
}

