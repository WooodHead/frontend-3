import { Message } from '@arco-design/web-vue'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import api from './api'
import type { CharaEntity, CreateCharaDto, UpdateCharaDto } from './api-base'
import { CHARA } from './graph/schema'
import { invalidateNode } from './graph/utils'
import type { MutationOptions } from './types'
import { UnitIDRange } from '@/utils/unit-id'

type CharaMutationOptions<T = void, D = CharaEntity> = MutationOptions<T, D>

export const selectChara = (data: CharaEntity) => ({
  ...data,
  avatar:
    data.avatar && `${import.meta.env.VITE_BASE_URL}/files/${data.avatar}`,
  avatarName: data.name.includes(' ')
    ? data.name.split(' ')[0]
    : data.name.slice(-2),
  range:
    data.unit && data.start && data.end
      ? UnitIDRange.fromDayjs(data.unit, data.start, data.end)
      : null,
})

export const useCharaCreate = (
  options?: CharaMutationOptions<CreateCharaDto>
) => {
  const client = useQueryClient()
  return useMutation({
    ...options,
    mutationFn: (dto) => api.chara.create(dto),
    onSuccess: (chara, vars, ctx) => {
      client.setQueryData(['chara', chara.id], chara)
      client.invalidateQueries(['chara', 'list'])
      options?.onSuccess?.(chara, vars, ctx)
    },
    onError: (e, vars, ctx) => {
      if (e.response?.status === 409) {
        Message.error('创建角色失败：已有同名角色')
      } else {
        Message.error(`创建角色失败：${e.response?.data.message}`)
      }
      options?.onError?.(e, vars, ctx)
    },
  })
}

type Update = UpdateCharaDto & { id: number }
export const useCharaUpdate = (options?: CharaMutationOptions<Update>) => {
  const client = useQueryClient()
  return useMutation({
    ...options,
    mutationFn: ({ id, ...dto }) => api.chara.update(id, dto),
    onSuccess: (chara, vars, ctx) => {
      client.setQueryData(['chara', vars.id], chara)
      client.invalidateQueries(['chara', 'list'])
      options?.onSuccess?.(chara, vars, ctx)
    },
    onError: (e, vars, ctx) => {
      Message.error(`更新角色失败：${e.response?.data.message}`)
      options?.onError?.(e, vars, ctx)
    },
  })
}

interface Remove {
  id: number
}
export const useCharaRemove = (options?: CharaMutationOptions<Remove>) => {
  const client = useQueryClient()
  return useMutation({
    ...options,
    mutationFn: ({ id }) => api.chara.remove(id),
    onSuccess: (chara, vars, ctx) => {
      Message.success('删除角色成功')
      client.removeQueries(['chara', vars.id])
      client.invalidateQueries(['chara', 'list'])
      invalidateNode(client, { type: CHARA, id: vars.id })
      options?.onSuccess?.(chara, vars, ctx)
    },
    onError: (e, vars, ctx) => {
      Message.error(`删除角色失败：${e.response?.data.message}`)
      options?.onError?.(e, vars, ctx)
    },
  })
}
