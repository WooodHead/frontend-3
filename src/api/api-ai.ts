/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface BaseQaDto {
  query: string
}

export interface ContentEntity {
  /** @format date-time */
  updateAt: string
  type: object
  id: number
  projectId: number
  content: string
}

export interface UpdateContentDto {
  type: 'event' | 'chara' | 'scene' | 'worldview'
  id: number
  content: string
}

export interface CharaOption {
  id: number
  name: string
  alias: string
  score: number
}

export interface UnresolvedCharasDto {
  name: string
  options: CharaOption[]
}

export interface CharaResolveEntity {
  resolved: number[]
  unresolved: UnresolvedCharasDto[]
}

export type SummarizeDescParams = object

import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  HeadersDefaults,
  ResponseType,
} from 'axios'

export type QueryParamsType = Record<string | number, any>

export interface FullRequestParams
  extends Omit<AxiosRequestConfig, 'data' | 'params' | 'url' | 'responseType'> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean
  /** request path */
  path: string
  /** content type of request body */
  type?: ContentType
  /** query params */
  query?: QueryParamsType
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType
  /** request body */
  body?: unknown
}

export type RequestParams = Omit<
  FullRequestParams,
  'body' | 'method' | 'query' | 'path'
>

export interface ApiConfig<SecurityDataType = unknown>
  extends Omit<AxiosRequestConfig, 'data' | 'cancelToken'> {
  securityWorker?: (
    securityData: SecurityDataType | null
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void
  secure?: boolean
  format?: ResponseType
}

export enum ContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
  Text = 'text/plain',
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance
  private securityData: SecurityDataType | null = null
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker']
  private secure?: boolean
  private format?: ResponseType

  constructor({
    securityWorker,
    secure,
    format,
    ...axiosConfig
  }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({
      ...axiosConfig,
      baseURL: axiosConfig.baseURL || '',
    })
    this.secure = secure
    this.format = format
    this.securityWorker = securityWorker
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data
  }

  protected mergeRequestParams(
    params1: AxiosRequestConfig,
    params2?: AxiosRequestConfig
  ): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method)

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method &&
          this.instance.defaults.headers[
            method.toLowerCase() as keyof HeadersDefaults
          ]) ||
          {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    }
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === 'object' && formItem !== null) {
      return JSON.stringify(formItem)
    } else {
      return `${formItem}`
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key]
      const propertyContent: any[] =
        property instanceof Array ? property : [property]

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File
        formData.append(
          key,
          isFileType ? formItem : this.stringifyFormItem(formItem)
        )
      }

      return formData
    }, new FormData())
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<T> => {
    const secureParams =
      ((typeof secure === 'boolean' ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {}
    const requestParams = this.mergeRequestParams(params, secureParams)
    const responseFormat = format || this.format || undefined

    if (
      type === ContentType.FormData &&
      body &&
      body !== null &&
      typeof body === 'object'
    ) {
      body = this.createFormData(body as Record<string, unknown>)
    }

    if (
      type === ContentType.Text &&
      body &&
      body !== null &&
      typeof body !== 'string'
    ) {
      body = JSON.stringify(body)
    }

    return this.instance
      .request({
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData
            ? { 'Content-Type': type }
            : {}),
        },
        params: query,
        responseType: responseFormat,
        data: body,
        url: path,
      })
      .then((response) => response.data)
  }
}

/**
 * @title No title
 * @version 1.0.0
 * @contact
 */
export class Api<
  SecurityDataType extends unknown
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @name BaseQa
   * @request POST:/
   */
  baseQa = (data: BaseQaDto, params: RequestParams = {}) =>
    this.request<string, any>({
      path: `/`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    })

  content = {
    /**
     * No description
     *
     * @tags content
     * @name Get
     * @request GET:/content
     */
    get: (
      query: {
        type: 'event' | 'chara' | 'scene' | 'worldview'
        id: number
      },
      params: RequestParams = {}
    ) =>
      this.request<ContentEntity, any>({
        path: `/content`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags content
     * @name Update
     * @request PUT:/content
     */
    update: (data: UpdateContentDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/content`,
        method: 'PUT',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags content
     * @name GetBatch
     * @request GET:/content/batch
     */
    getBatch: (
      query: {
        type: 'event' | 'chara' | 'scene' | 'worldview'
        ids: number[]
      },
      params: RequestParams = {}
    ) =>
      this.request<ContentEntity[], any>({
        path: `/content/batch`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags content
     * @name Search
     * @request GET:/content/search
     */
    search: (
      query: {
        type: 'event' | 'chara' | 'scene' | 'worldview'
        query: string
        /** @min 1 */
        k: number
      },
      params: RequestParams = {}
    ) =>
      this.request<SummarizeDescParams, any>({
        path: `/content/search`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),
  }
  query = {
    /**
     * No description
     *
     * @name Generate
     * @request GET:/query/query
     */
    generate: (
      query: {
        /**
         * @min 1
         * @default 1
         */
        n: number
      },
      params: RequestParams = {}
    ) =>
      this.request<string[], any>({
        path: `/query/query`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),
  }
  chara = {
    /**
     * No description
     *
     * @tags chara
     * @name Resolve
     * @request POST:/chara/{id}
     */
    resolve: (id: number, params: RequestParams = {}) =>
      this.request<CharaResolveEntity, any>({
        path: `/chara/${id}`,
        method: 'POST',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags chara
     * @name GetUnresolved
     * @request GET:/chara/{eventId}/unresolved
     */
    getUnresolved: (eventId: number, params: RequestParams = {}) =>
      this.request<UnresolvedCharasDto[], any>({
        path: `/chara/${eventId}/unresolved`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags chara
     * @name RemoveUnresolved
     * @request DELETE:/chara/{eventId}/unresolved/{name}
     */
    removeUnresolved: (
      eventId: number,
      name: string,
      params: RequestParams = {}
    ) =>
      this.request<void, any>({
        path: `/chara/${eventId}/unresolved/${name}`,
        method: 'DELETE',
        ...params,
      }),
  }
  summarize = {
    /**
     * No description
     *
     * @tags summarize
     * @name Title
     * @request POST:/summarize/{id}/title
     */
    title: (id: number, params: RequestParams = {}) =>
      this.request<string, any>({
        path: `/summarize/${id}/title`,
        method: 'POST',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags summarize
     * @name Desc
     * @request POST:/summarize/{id}/desc
     */
    desc: (id: number, data: SummarizeDescParams, params: RequestParams = {}) =>
      this.request<string, any>({
        path: `/summarize/${id}/desc`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),
  }
}
