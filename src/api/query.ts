const BASE_URL: string = import.meta.env.VITE_BASE_URL

type IGetMethod = 'get' | 'delete' | 'head' | 'options'
type IPostMethod = 'post' | 'put' | 'patch'

export interface IError {
  code: number
  message?: string
}

export type IResponse<T = undefined> = IError & { data: T }

const handleJsonResponse = async <T>(resp: Response) => {
  if (!resp.ok) {
    // eslint-disable-next-line no-throw-literal
    throw { code: resp.status } as IError
  }
  const json = await resp.json() as IResponse<T>
  const { code, message, data } = json
  if (code !== 200) {
    // eslint-disable-next-line no-throw-literal
    throw { code, message } as IError
  }
  return data
}

const requestWithParams = async <T>(method: IGetMethod, url: string, params?: Record<string, string>) => {
  const realUrl = new URL(url.trim().replace(/\/+$/, ''), BASE_URL)
  Object.entries(params || {}).forEach(([key, value]) => {
    realUrl.searchParams.append(key, value)
  })

  const resp = await fetch(
    realUrl,
    {
      method,
      headers: { 'Content-Type': 'application/json' },
    })
  return handleJsonResponse<T>(resp)
}

const requestWithData = async <D, T>(method: IPostMethod, contentType: string, url: string, data: D) => {
  const resp = await fetch(
    new URL(url, BASE_URL),
    {
      method,
      headers: { 'Content-Type': contentType },
      body: JSON.stringify(data),
    })
  return handleJsonResponse<T>(resp)
}

export const get = async <T>(url: string, params?: Record<string, string>) => requestWithParams<T>('get', url, params)

export const del = async <T>(url: string, params?: Record<string, string>) => requestWithParams<T>('delete', url, params)

export const head = async <T>(url: string, params?: Record<string, string>) => requestWithParams<T>('head', url, params)

export const options = async <T>(url: string, params?: Record<string, string>) => requestWithParams<T>('options', url, params)

export const post = async <D, T>(url: string, data: D) => requestWithData<D, T>('post', 'application/json', url, data)

export const filePost = async <D extends FormData, T>(url: string, data: D) => requestWithData<D, T>('post', 'multipart/form-data', url, data)

export const put = async <D, T>(url: string, data: D) => requestWithData<D, T>('put', 'application/json', url, data)

// type IQueryKey<T = any> = [string, T?]
// type IQueryFn<D, T, P> = typeof VueQuery.useQuery<D, IError, T, IQueryKey<P>>
// type IQueryOptions<D, T, P> = Parameters<IQueryFn<D, T, P>>[2]
// export const useJsonQuery = <D = any, SD = D, P = {}>(
//   key: IQueryKey<P>,
//   options?: IQueryOptions<D, SD, P> & { method?: IGetMethod },
// ) => {
//   const [path, rawParams] = key
//   const params = rawParams ?? {}
//   const method = options?.method || 'get'

//   return VueQuery.useQuery<D, IError, SD, IQueryKey<P>>(
//     key,
//     () => requestWithParams<D>(method, path, params),
//     options,
//   )
// }

// type IInfQueryKey<T = any> = [string, T?]
// type IInfQueryFn<D, SD, P> = typeof VueQuery.useInfiniteQuery<D, IError, SD, IInfQueryKey<P>>
// type IInfQueryOptions<D, SD, P> = Parameters<IInfQueryFn<D, SD, P>>[2]
// export const useInfJsonQuery = <D = any, SD = D, P = {}>(
//   key: IInfQueryKey<P>,
//   options?: IInfQueryOptions<D, SD, P> & { method?: IGetMethod },
// ) => {
//   const [path, rawParams] = key
//   const params = rawParams ?? {}
//   const method = options?.method || 'get'

//   return VueQuery.useInfiniteQuery<D, IError, SD, IInfQueryKey<P>>(
//     key,
//     ({ pageParam }) => requestWithParams<D>(method, path, { ...params, page: pageParam }),
//     options,
//   )
// }

// type IMutationKey = string
// type IMutationFn<D, T> = typeof VueQuery.useMutation<T, IError, D>
// type IMutationOptions<D, T> = Parameters<IMutationFn<D, T>>[2]
// export const useJsonMutation = <D, T = undefined>(
//   key: IMutationKey,
//   options?: IMutationOptions<D, T> & { method?: IPostMethod },
// ) => {
//   const path = key
//   const method = options?.method || 'post'

//   return VueQuery.useMutation(
//     (data: D) => requestWithData<D, T>(method, 'application/json', path, data),
//     options,
//   )
// }

