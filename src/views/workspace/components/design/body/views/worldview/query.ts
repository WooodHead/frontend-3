import { Message } from '@arco-design/web-vue'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { toTree } from '../../component/search-tree/utils'
import api from '@/api/api'
import type { CreateWorldviewDto, WorldviewEntity } from '@/api/api-base'
import type { ApiError } from '@/api/types'

export const useWorldviewQuery = () => useQuery({
  queryKey: ['worldview'],
  queryFn: () => api.worldview.getAll(),
  select: toTree,
})

export const useWorldviewCreate = () => {
  const client = useQueryClient()
  return useMutation({
    mutationFn: (dto: CreateWorldviewDto) => api.worldview.create(dto),
    onSuccess: node => {
      client.setQueryData<WorldviewEntity[]>(
        ['worldview'],
        data => data && ({ ...data, node }))
    },
    onError: (e: ApiError) => {
      Message.error(`创建失败：${e.response?.data.message}`)
    },
  })
}

export const useWorldviewRemove = () => {
  const client = useQueryClient()
  return useMutation({
    mutationFn: ({ id }: { id: number }) => api.worldview.remove(id),
    onSuccess: ({ id }) => {
      Message.success('删除成功')
      client.setQueryData<WorldviewEntity[]>(
        ['worldview'],
        data => data && data.filter(item => item.id !== id))
    },
    onError: (e: ApiError) => {
      Message.error(`删除失败：${e.response?.data.message}`)
    },
  })
}
