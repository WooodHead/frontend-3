import { Message } from '@arco-design/web-vue'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import type { MaybeRef } from '@vueuse/shared'
import api from './api'
import type { CharacterEntity, CreateCharacterDto, MutateEventsDto, UpdateCharacterDto } from './api-base'
import type { MutationOptions } from './types'

// type CharaQueryOptions<T = CharacterEntity> = QueryOptions<T>
type CharaMutationOptions<T = void, D = CharacterEntity> = MutationOptions<T, D>

export const useCharaCreate = (options?: CharaMutationOptions<CreateCharacterDto>) => {
  const client = useQueryClient()
  return useMutation({
    ...options,
    mutationFn: dto => api.character.create(dto),
    onSuccess: (chara, vars, ctx) => {
      client.setQueryData(['character', chara.id], chara)
      client.invalidateQueries(['character', 'list'])
      for (const eventId of chara.events) {
        client.invalidateQueries(['event', eventId])
      }
      options?.onSuccess?.(chara, vars, ctx)
    },
    onError: (e, vars, ctx) => {
      Message.error(`创建角色失败：${e.message}`)
      options?.onError?.(e, vars, ctx)
    },
  })
}

export const useCharaUpdate = (id: MaybeRef<number | undefined>, options?: CharaMutationOptions<UpdateCharacterDto>) => {
  const client = useQueryClient()
  return useMutation({
    ...options,
    mutationFn: (dto: UpdateCharacterDto) => api.character.update(unref(id)!, dto),
    onSuccess: (chara, vars, ctx) => {
      client.invalidateQueries(['character', unref(id)])
      client.invalidateQueries(['character', 'list'])
      for (const eventId of chara.events) {
        client.invalidateQueries(['event', eventId])
      }
      options?.onSuccess?.(chara, vars, ctx)
    },
    onError: (e, vars, ctx) => {
      Message.error(`更新角色失败：${e.message}`)
      options?.onError?.(e, vars, ctx)
    },
  })
}

export const useCharaRemove = (id: MaybeRef<number | undefined>, options?: CharaMutationOptions) => {
  const client = useQueryClient()
  return useMutation({
    ...options,
    mutationFn: () => api.character.remove(unref(id)!),
    onSuccess: (chara, vars, ctx) => {
      Message.success('删除角色成功')
      client.removeQueries(['character', unref(id)])
      client.invalidateQueries(['character', 'list'])
      for (const eventId of chara.events) {
        client.invalidateQueries(['event', eventId])
      }
      options?.onSuccess?.(chara, vars, ctx)
    },
    onError: (e, vars, ctx) => {
      Message.error(`删除角色失败：${e.message}`)
      options?.onError?.(e, vars, ctx)
    },
  })
}

export const useCharaConnectEvent = (id: MaybeRef<number | undefined>, options?: CharaMutationOptions<MutateEventsDto>) => {
  const client = useQueryClient()
  return useMutation({
    ...options,
    mutationFn: (dto: MutateEventsDto) => api.character.addEvents(unref(id)!, dto),
    onSuccess: (chara, vars, ctx) => {
      client.invalidateQueries(['character', unref(id)])
      for (const eventId of vars.events) {
        client.invalidateQueries(['event', eventId])
      }
      options?.onSuccess?.(chara, vars, ctx)
    },
    onError: (e, vars, ctx) => {
      Message.error(`添加事件失败：${e.message}`)
      options?.onError?.(e, vars, ctx)
    },
  })
}

export const useCharaDisconnectEvent = (id: MaybeRef<number | undefined>, options?: CharaMutationOptions<MutateEventsDto>) => {
  const client = useQueryClient()
  return useMutation({
    ...options,
    mutationFn: (dto: MutateEventsDto) => api.character.removeEvents(unref(id)!, dto),
    onSuccess: (chara, vars, ctx) => {
      client.invalidateQueries(['character', unref(id)])
      for (const eventId of vars.events) {
        client.invalidateQueries(['event', eventId])
      }
      options?.onSuccess?.(chara, vars, ctx)
    },
    onError: (e, vars, ctx) => {
      Message.error(`移除事件失败：${e.message}`)
      options?.onError?.(e, vars, ctx)
    },
  })
}
