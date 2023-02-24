import { Message } from '@arco-design/web-vue'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import type { MaybeRef } from '@vueuse/shared'
import api from './api'
import type { CharacterEntity, CreateCharacterDto, UpdateCharacterDto } from './api-base'
import type { MutationOptions } from './types'

type CharaMutationOptions<T = void, D = CharacterEntity> = MutationOptions<T, D>

export const useCharaCreate = (options?: CharaMutationOptions<CreateCharacterDto>) => {
  const client = useQueryClient()
  return useMutation({
    ...options,
    mutationFn: dto => api.character.create(dto),
    onSuccess: (chara, vars, ctx) => {
      client.setQueryData(['chara', unref(chara.id)], chara)
      client.invalidateQueries(['character', 'list'])
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
      client.setQueryData(['chara', unref(id)], chara)
      client.invalidateQueries(['character', 'list'])
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
      client.removeQueries(['chara', unref(id)])
      client.invalidateQueries(['character', 'list'])
      options?.onSuccess?.(chara, vars, ctx)
    },
    onError: (e, vars, ctx) => {
      Message.error(`删除角色失败：${e.message}`)
      options?.onError?.(e, vars, ctx)
    },
  })
}
