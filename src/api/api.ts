import { Api } from './api-base'

export const api = new Api({
  baseURL: import.meta.env.VITE_BASE_URL,
})

api.instance.interceptors.request.use(req => {
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
})

export default api
