import type { AxiosRequestConfig } from 'axios'
import { Api as BaseApi } from './api-base'
import { Api as AiApi } from './api-ai'

export const api = new BaseApi({
  baseURL: 'http://localhost:4000',
})

export const aiApi = new AiApi({
  baseURL: 'http://localhost:4001',
})

const interceptRequest = (req: AxiosRequestConfig<any>) => {
  // 把一些常用的信息放在header里，省的手动传
  const ctx = {
    'project-id': sessionStorage.getItem('project-id'),
    'user-id': sessionStorage.getItem('user-id'),
  }

  req.headers = {
    ...req.headers,
    ...ctx,
  }

  return req
}

api.instance.interceptors.request.use(interceptRequest)
aiApi.instance.interceptors.request.use(interceptRequest)

export default api
