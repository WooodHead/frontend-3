import { Message } from '@arco-design/web-vue'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import type { MaybeRef } from '@vueuse/shared'
import api from './api'
import type { CreateEventDto, EventEntity, MutateCharactersDto, MutateScenesDto, MutateSubsDto, MutateSupsDto, UpdateEventDto } from './api-base'
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
      for (const charaId of event.characters) {
        client.invalidateQueries(['character', charaId])
      }
      for (const sceneId of event.scenes) {
        client.invalidateQueries(['scene', sceneId])
      }
      for (const supId of event.sups) {
        client.invalidateQueries(['event', supId])
      }
      for (const subId of event.subs) {
        client.invalidateQueries(['event', subId])
      }
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
      client.invalidateQueries(['event', unref(event.id)])
      client.invalidateQueries(['event', 'list'])
      for (const charaId of event.characters) {
        client.invalidateQueries(['character', charaId])
      }
      for (const sceneId of event.scenes) {
        client.invalidateQueries(['scene', sceneId])
      }
      for (const supId of event.sups) {
        client.invalidateQueries(['event', supId])
      }
      for (const subId of event.subs) {
        client.invalidateQueries(['event', subId])
      }
      options?.onSuccess?.(event, vars, ctx)
    },
    onError: (e, vars, ctx) => {
      Message.error(`更新事件失败：${e.message}`)
      options?.onError?.(e, vars, ctx)
    },
  })
}

export const useEventRemove = (id: MaybeRef<number | undefined>, options?: EventMutationOptions) => {
  const client = useQueryClient()
  return useMutation({
    ...options,
    mutationFn: () => api.event.remove(unref(id)!),
    onSuccess: (event, vars, ctx) => {
      Message.success('删除事件成功')
      client.removeQueries(['event', unref(id)])
      client.invalidateQueries(['event', 'list'])
      for (const charaId of event.characters) {
        client.invalidateQueries(['character', charaId])
      }
      for (const sceneId of event.scenes) {
        client.invalidateQueries(['scene', sceneId])
      }
      for (const supId of event.sups) {
        client.invalidateQueries(['event', supId])
      }
      for (const subId of event.subs) {
        client.invalidateQueries(['event', subId])
      }
      options?.onSuccess?.(event, vars, ctx)
    },
    onError: (e, vars, ctx) => {
      Message.error(`删除事件失败：${e.message}`)
      options?.onError?.(e, vars, ctx)
    },
  })
}

export const useEventConnectChara = (id: MaybeRef<number | undefined>, options?: EventMutationOptions<MutateCharactersDto>) => {
  const client = useQueryClient()
  return useMutation({
    ...options,
    mutationFn: (dto: MutateCharactersDto) => api.event.addCharacters(unref(id)!, dto),
    onSuccess: (event, vars, ctx) => {
      client.invalidateQueries(['event', unref(event.id)])
      for (const charaId of vars.characters) {
        client.invalidateQueries(['character', charaId])
      }
      options?.onSuccess?.(event, vars, ctx)
    },
    onError: (e, vars, ctx) => {
      Message.error(`关联角色失败：${e.message}`)
      options?.onError?.(e, vars, ctx)
    },
  })
}

export const useEventDisconnectChara = (id: MaybeRef<number | undefined>, options?: EventMutationOptions<MutateCharactersDto>) => {
  const client = useQueryClient()
  return useMutation({
    ...options,
    mutationFn: (dto: MutateCharactersDto) => api.event.removeCharacters(unref(id)!, dto),
    onSuccess: (event, vars, ctx) => {
      client.invalidateQueries(['event', unref(event.id)])
      for (const charaId of vars.characters) {
        client.invalidateQueries(['character', charaId])
      }
      options?.onSuccess?.(event, vars, ctx)
    },
    onError: (e, vars, ctx) => {
      Message.error(`取消关联角色失败：${e.message}`)
      options?.onError?.(e, vars, ctx)
    },
  })
}

export const useEventConnectScenes = (id: MaybeRef<number | undefined>, options?: EventMutationOptions<MutateScenesDto>) => {
  const client = useQueryClient()
  return useMutation({
    ...options,
    mutationFn: (dto: MutateScenesDto) => api.event.addScenes(unref(id)!, dto),
    onSuccess: (event, vars, ctx) => {
      client.invalidateQueries(['event', unref(event.id)])
      for (const sceneId of vars.scenes) {
        client.invalidateQueries(['scene', sceneId])
      }
      options?.onSuccess?.(event, vars, ctx)
    },
    onError: (e, vars, ctx) => {
      Message.error(`关联场景失败：${e.message}`)
      options?.onError?.(e, vars, ctx)
    },
  })
}

export const useEventDisconnectScenes = (id: MaybeRef<number | undefined>, options?: EventMutationOptions<MutateScenesDto>) => {
  const client = useQueryClient()
  return useMutation({
    ...options,
    mutationFn: (dto: MutateScenesDto) => api.event.removeScenes(unref(id)!, dto),
    onSuccess: (event, vars, ctx) => {
      client.invalidateQueries(['event', unref(event.id)])
      for (const sceneId of vars.scenes) {
        client.invalidateQueries(['scene', sceneId])
      }
      options?.onSuccess?.(event, vars, ctx)
    },
    onError: (e, vars, ctx) => {
      Message.error(`取消关联场景失败：${e.message}`)
      options?.onError?.(e, vars, ctx)
    },
  })
}

export const useEventConnectSups = (id: MaybeRef<number | undefined>, options?: EventMutationOptions<MutateSupsDto>) => {
  const client = useQueryClient()
  return useMutation({
    ...options,
    mutationFn: (dto: MutateSupsDto) => api.event.addSups(unref(id)!, dto),
    onSuccess: (event, vars, ctx) => {
      client.invalidateQueries(['event', unref(event.id)])
      for (const supId of vars.sups) {
        client.invalidateQueries(['event', supId])
      }
      options?.onSuccess?.(event, vars, ctx)
    },
    onError: (e, vars, ctx) => {
      Message.error(`关联父事件失败：${e.message}`)
      options?.onError?.(e, vars, ctx)
    },
  })
}

export const useEventDisconnectSups = (id: MaybeRef<number | undefined>, options?: EventMutationOptions<MutateSupsDto>) => {
  const client = useQueryClient()
  return useMutation({
    ...options,
    mutationFn: (dto: MutateSupsDto) => api.event.removeSups(unref(id)!, dto),
    onSuccess: (event, vars, ctx) => {
      client.invalidateQueries(['event', unref(event.id)])
      for (const supId of vars.sups) {
        client.invalidateQueries(['event', supId])
      }
      options?.onSuccess?.(event, vars, ctx)
    },
    onError: (e, vars, ctx) => {
      Message.error(`取消关联父事件失败：${e.message}`)
      options?.onError?.(e, vars, ctx)
    },
  })
}

export const useEventConnectSubs = (id: MaybeRef<number | undefined>, options?: EventMutationOptions<MutateSubsDto>) => {
  const client = useQueryClient()
  return useMutation({
    ...options,
    mutationFn: (dto: MutateSubsDto) => api.event.addSubs(unref(id)!, dto),
    onSuccess: (event, vars, ctx) => {
      client.invalidateQueries(['event', unref(event.id)])
      for (const subId of vars.subs) {
        client.invalidateQueries(['event', subId])
      }
      options?.onSuccess?.(event, vars, ctx)
    },
    onError: (e, vars, ctx) => {
      Message.error(`关联子事件失败：${e.message}`)
      options?.onError?.(e, vars, ctx)
    },
  })
}

export const useEventDisconnectSubs = (id: MaybeRef<number | undefined>, options?: EventMutationOptions<MutateSubsDto>) => {
  const client = useQueryClient()
  return useMutation({
    ...options,
    mutationFn: (dto: MutateSubsDto) => api.event.removeSubs(unref(id)!, dto),
    onSuccess: (event, vars, ctx) => {
      client.invalidateQueries(['event', unref(event.id)])
      for (const subId of vars.subs) {
        client.invalidateQueries(['event', subId])
      }
      options?.onSuccess?.(event, vars, ctx)
    },
    onError: (e, vars, ctx) => {
      Message.error(`取消关联子事件失败：${e.message}`)
      options?.onError?.(e, vars, ctx)
    },
  })
}
