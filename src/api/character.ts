import { Message } from '@arco-design/web-vue'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import api from './api'
import type { CharacterEntity, CreateCharacterDto, UpdateCharacterDto } from './api-base'
import { CHARA } from './graph/schema'
import { invalidateNode } from './graph/utils'
import type { MutationOptions } from './types'
import { UnitIDRange } from '@/utils/unit-id'

type CharaMutationOptions<T = void, D = CharacterEntity> = MutationOptions<T, D>

export const selectChara = (data: CharacterEntity) => ({
  ...data,
  avatar: data.avatar && `${import.meta.env.VITE_BASE_URL}/${data.avatar}`,
  range: (data.unit && data.start && data.end)
    ? UnitIDRange.fromDayjs(data.unit, data.start, data.end)
    : null,
})

export const useCharaCreate = (options?: CharaMutationOptions<CreateCharacterDto>) => {
  const client = useQueryClient()
  return useMutation({
    ...options,
    mutationFn: dto => api.character.create(dto),
    onSuccess: (chara, vars, ctx) => {
      client.setQueryData(['character', chara.id], chara)
      client.invalidateQueries(['character', 'list'])
      options?.onSuccess?.(chara, vars, ctx)
    },
    onError: (e, vars, ctx) => {
      if (e.response?.status === 409) {
        Message.error('创建角色失败：已有同名角色')
      }
      else {
        Message.error(`创建角色失败：${e.response?.data.message}`)
      }
      options?.onError?.(e, vars, ctx)
    },
  })
}

type Update = UpdateCharacterDto & { id: number }
export const useCharaUpdate = (options?: CharaMutationOptions<Update>) => {
  const client = useQueryClient()
  return useMutation({
    ...options,
    mutationFn: ({ id, ...dto }) => api.character.update(id, dto),
    onSuccess: (chara, vars, ctx) => {
      client.setQueryData(['character', vars.id], chara)
      client.invalidateQueries(['character', 'list'])
      options?.onSuccess?.(chara, vars, ctx)
    },
    onError: (e, vars, ctx) => {
      Message.error(`更新角色失败：${e.response?.data.message}`)
      options?.onError?.(e, vars, ctx)
    },
  })
}

interface Remove { id: number }
export const useCharaRemove = (options?: CharaMutationOptions<Remove>) => {
  const client = useQueryClient()
  return useMutation({
    ...options,
    mutationFn: ({ id }) => api.character.remove(id),
    onSuccess: (chara, vars, ctx) => {
      Message.success('删除角色成功')
      client.removeQueries(['character', vars.id])
      client.invalidateQueries(['character', 'list'])
      invalidateNode(client, { type: CHARA, id: vars.id })
      options?.onSuccess?.(chara, vars, ctx)
    },
    onError: (e, vars, ctx) => {
      Message.error(`删除角色失败：${e.response?.data.message}`)
      options?.onError?.(e, vars, ctx)
    },
  })
}
