import type { AxiosRequestConfig } from 'axios'
import { Api as BaseApi } from './api-base'
import { Api as GraphApi } from './api-graph'
import { Api as QaApi } from './api-qa'

export const api = new BaseApi({
  baseURL: 'http://localhost:4000',
})

export const graphApi = new GraphApi({
  baseURL: 'http://localhost:4001',
})

export const qaApi = new QaApi({
  baseURL: 'http://localhost:4002',
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
graphApi.instance.interceptors.request.use(interceptRequest)
qaApi.instance.interceptors.request.use(interceptRequest)

export default api
