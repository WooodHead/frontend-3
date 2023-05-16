import { useMutation } from '@tanstack/vue-query'
import { Message } from '@arco-design/web-vue'
import api from './api'
import type {
  RemoveFileDto,
  SaveTempFileDto,
  UploadFileDto,
  UploadTempFileDto,
} from './api-base'
import type { ApiError } from './types'

export const useFileUpload = () => {
  return useMutation({
    mutationFn: (dto: UploadFileDto) => api.file.upload(dto),
    onError: (e: ApiError) => {
      Message.error(`上传失败：${e.response?.data.message}`)
    },
  })
}

export const useFileRemove = () => {
  return useMutation({
    mutationFn: (dto: RemoveFileDto) => api.file.remove(dto),
    onError: (e: ApiError) => {
      Message.error(`删除失败：${e.response?.data.message}`)
    },
  })
}

export const useTempFileUpload = () => {
  return useMutation({
    mutationFn: (dto: UploadTempFileDto) => api.file.uploadTemp(dto),
    onError: (e: ApiError) => {
      Message.error(`上传失败：${e.response?.data.message}`)
    },
  })
}

export const useTempFileSave = () => {
  return useMutation({
    mutationFn: (dto: SaveTempFileDto) => api.file.saveTemp(dto),
    onError: (e: ApiError) => {
      Message.error(`保存失败：${e.response?.data.message}`)
    },
  })
}
