import { Api } from './api-base'

const BASE_URL: string = import.meta.env.VITE_BASE_URL

const api = new Api({
  baseURL: BASE_URL,
})

api.instance.interceptors.request.use(req => {
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
