import { useMutation } from '@tanstack/vue-query'
import { Message } from '@arco-design/web-vue'
import type { AxiosError } from 'axios'
import { sha512 } from 'js-sha512'
import api from './api'
import type { UnregisterFileDto } from './api-base'

const getHashName = async (file: File) => {
  const arrayBuffer = await file.arrayBuffer()
  const hash = sha512(arrayBuffer)
  const fileNameParts = file.name.split('.')
  const ext = fileNameParts[fileNameParts.length - 1]
  return `${hash}.${ext}`
}

/**
 * 上传临时文件
 */
export const useTempFileUpload = () => {
  return useMutation({
    mutationFn: async ({ file }: { file: File }) => {
      const name = await getHashName(file)
      let url = await api.file.checkTempFile(name)
      if (url === '') {
        url = await api.file.uploadTempFile({ file })
      }
      return url
    },
    onSuccess: () => {
      Message.success('上传成功')
    },
    onError: ({ message }: AxiosError) => {
      Message.error(`上传失败: ${message}`)
    },
  })
}

/**
 * 上传文件到指定路径，会尝试先注册文件，如果注册失败再上传文件
 */
export const useFileUpload = () => {
  return useMutation({
    mutationFn: async ({ file, position, replace = false }: {
      file: File
      position: string
      replace?: boolean
    }) => {
      const name = await getHashName(file)
      const projectId = sessionStorage.getItem('project-id')
      position = `project_${projectId}/${position}`
      let url = await api.file.registerFile({ name, position, replace })
      if (url === '') {
        url = await api.file.uploadFile({ file, position })
      }
      return url
    },
    onSuccess: () => {
      Message.success('上传成功')
    },
    onError: ({ message }: AxiosError) => {
      Message.error(`上传失败: ${message}`)
    },

  })
}

/**
 * 将指定位置的文件删除
 */
export const useFileRemove = () => {
  return useMutation({
    mutationFn: (dto: UnregisterFileDto) => api.file.unregisterFile(dto),
    onSuccess: () => {
      Message.success('删除成功')
    },
    onError: ({ message }: AxiosError) => {
      Message.error(`删除失败: ${message}`)
    },
  })
}
