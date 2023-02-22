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

export interface EventEntity {
  type: "ATOM" | "COLLECTION";
  id: number;
  name: string;
  description: string | null;
  color: string;
  serial: number;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
  /** @format date-time */
  deleted: string | null;
  unit: number;
  /** @format date-time */
  start: string;
  /** @format date-time */
  end: string;
  contentId: number | null;
  projectId: number;
}

export interface EventDetailEntity {
  type: "ATOM" | "COLLECTION";
  id: number;
  name: string;
  description: string | null;
  color: string;
  serial: number;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
  /** @format date-time */
  deleted: string | null;
  unit: number;
  /** @format date-time */
  start: string;
  /** @format date-time */
  end: string;
  contentId: number | null;
  projectId: number;
  superEvents: EventEntity[];
  subEvents: EventEntity[];
  brief?: string;
}

export interface CreateEventDto {
  type: "ATOM" | "COLLECTION";
  name: string;
  description: string | null;
  color: string;
  /**
   * @min 0
   * @max 8
   */
  unit: number;
  /** @format date-time */
  start: string;
  /** @format date-time */
  end: string;
}

export interface UpdateEventDto {
  type?: "ATOM" | "COLLECTION";
  name?: string;
  description?: string | null;
  color?: string;
  /**
   * @min 0
   * @max 8
   */
  unit?: number;
  /** @format date-time */
  start?: string;
  /** @format date-time */
  end?: string;
}

export interface EventContentEntity {
  id: number;
  /** @format date-time */
  updatedAt: string;
  content: string;
  eventId: number;
}

export interface UpdateContentDto {
  content?: string;
}

export interface EventTodoEntity {
  id: number;
  title: string;
  color: string | null;
  checked: boolean;
  eventId: number | null;
}

export interface CreateTodoDto {
  title: string;
  color: string | null;
}

export interface UpdateTodoDto {
  color?: string;
  checked?: boolean;
}

export interface UserEntity {
  id: number;
  username: string;
  phone: string | null;
  email: string | null;
  avatar: string | null;
}

export interface UserLoginRespDto {
  access_token: string;
}

export interface CreateUserDto {
  username: string;
  password: string;
  phone?: string;
  email?: string;
}

export interface CreateProjectDto {
  name: string;
  description: string;
}

export interface ProjectEntity {
  id: number;
  serial: number;
  name: string;
  description: string | null;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
  /** @format date-time */
  deleted: string | null;
}

export interface UpdateProjectDto {
  name?: string;
  description?: string;
}

export interface WorkspaceEntity {
  id: number;
  origin: string | null;
  layout: object[] | null;
  lock: boolean;
  projectId: number;
}

export interface UpdateWorkspaceDto {
  origin?: string;
  layout?: object[];
  lock?: boolean;
}

export interface SettingsEntity {
  id: number;
  projectId: number;
  darkMode: boolean;
}

export interface UpdateSettingsDto {
  darkMode?: boolean;
}

export interface CreateCharacterDto {
  name: string;
  alias?: string[];
  description?: string;
  avatar?: string;
  /**
   * @min 0
   * @max 8
   */
  unit?: number;
  /** @format date-time */
  start?: string;
  /** @format date-time */
  end?: string;
  eventIds?: number[];
}

export interface CharacterEntity {
  id: number;
  name: string;
  alias: string[];
  description: string | null;
  avatar: string | null;
  /** @format date-time */
  deleted: string | null;
  unit: number | null;
  /** @format date-time */
  start: string | null;
  /** @format date-time */
  end: string | null;
}

export interface CreateSceneDto {
  name: string;
  description?: string;
}

export interface SceneEntity {
  id: number;
  name: string;
  alias: string[];
  description: string | null;
  /** @format date-time */
  deleted: string | null;
  superId: number | null;
}

export interface UpdateSceneDto {
  subSceneIds?: number[];
  superSceneId?: number;
  name?: string;
  description?: string;
}

export interface CreateWorldviewDto {
  name: string;
  description?: string;
}

export interface WorldviewEntity {
  id: number;
  name: string;
  description: string | null;
  content: string;
  images: string[];
  /** @format date-time */
  deleted: string | null;
  superId: number | null;
}

export interface UpdateWorldviewDto {
  content?: string;
  name?: string;
  description?: string;
}

import axios, { AxiosInstance, AxiosRequestConfig, HeadersDefaults, ResponseType } from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
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
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
      body = JSON.stringify(body);
    }

    return this.instance
      .request({
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
        },
        params: query,
        responseType: responseFormat,
        data: body,
        url: path,
      })
      .then((response) => response.data);
  };
}

/**
 * @title No title
 * @version 1.0.0
 * @contact
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  apiDocs = {
    /**
     * No description
     *
     * @name GetApiDocs
     * @request GET:/api-docs
     */
    getApiDocs: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api-docs`,
        method: "GET",
        ...params,
      }),
  };
  event = {
    /**
     * No description
     *
     * @tags event
     * @name Get
     * @request GET:/event/{id}
     */
    get: (id: number, params: RequestParams = {}) =>
      this.request<EventEntity, any>({
        path: `/event/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags event
     * @name Update
     * @request PUT:/event/{id}
     */
    update: (id: number, data: UpdateEventDto, params: RequestParams = {}) =>
      this.request<EventEntity, any>({
        path: `/event/${id}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags event
     * @name Remove
     * @request DELETE:/event/{id}
     */
    remove: (
      id: number,
      query: {
        cascade: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<EventEntity[], any>({
        path: `/event/${id}`,
        method: "DELETE",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags event
     * @name GetDetail
     * @request GET:/event/{id}/detail
     */
    getDetail: (id: number, params: RequestParams = {}) =>
      this.request<EventDetailEntity, any>({
        path: `/event/${id}/detail`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags event
     * @name GetByRange
     * @request GET:/event/range
     */
    getByRange: (
      query: {
        /**
         * @min 0
         * @max 8
         */
        unit: number;
        /** @format date-time */
        start: string;
        /** @format date-time */
        end: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<EventEntity[], any>({
        path: `/event/range`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags event
     * @name GetBySerial
     * @request GET:/event/serial
     */
    getBySerial: (serial: number, params: RequestParams = {}) =>
      this.request<object, any>({
        path: `/event/serial`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags event
     * @name SearchByName
     * @request GET:/event/search/name
     */
    searchByName: (
      query: {
        text: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<EventEntity[], any>({
        path: `/event/search/name`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags event
     * @name Create
     * @request POST:/event
     */
    create: (data: CreateEventDto, params: RequestParams = {}) =>
      this.request<EventEntity, any>({
        path: `/event`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags event
     * @name GetContent
     * @request GET:/event/{id}/content
     */
    getContent: (id: number, params: RequestParams = {}) =>
      this.request<EventContentEntity, any>({
        path: `/event/${id}/content`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags event
     * @name UpdateContent
     * @request PUT:/event/{id}/content
     */
    updateContent: (id: number, data: UpdateContentDto, params: RequestParams = {}) =>
      this.request<EventContentEntity, any>({
        path: `/event/${id}/content`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags event
     * @name SearchContent
     * @request GET:/event/search/content
     */
    searchContent: (
      query: {
        text: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<EventEntity[], any>({
        path: `/event/search/content`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description 获取某个事件的全部todo项
     *
     * @tags event
     * @name GetTodos
     * @request GET:/event/{id}/todo
     */
    getTodos: (id: number, params: RequestParams = {}) =>
      this.request<EventTodoEntity[], any>({
        path: `/event/${id}/todo`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags event
     * @name CreateTodo
     * @request POST:/event/{id}/todo
     */
    createTodo: (id: number, data: CreateTodoDto, params: RequestParams = {}) =>
      this.request<EventTodoEntity, any>({
        path: `/event/${id}/todo`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags event
     * @name UpdateTodo
     * @request PUT:/event/{id}/todo
     */
    updateTodo: (id: number, data: UpdateTodoDto, params: RequestParams = {}) =>
      this.request<EventTodoEntity, any>({
        path: `/event/${id}/todo`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description 获取单个todo项
     *
     * @tags event
     * @name GetTodo
     * @request GET:/event/todo/{id}
     */
    getTodo: (id: number, params: RequestParams = {}) =>
      this.request<EventTodoEntity, any>({
        path: `/event/todo/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags event
     * @name RemoveTodo
     * @request DELETE:/event/todo/{id}
     */
    removeTodo: (id: number, params: RequestParams = {}) =>
      this.request<EventTodoEntity, any>({
        path: `/event/todo/${id}`,
        method: "DELETE",
        format: "json",
        ...params,
      }),
  };
  user = {
    /**
     * No description
     *
     * @tags user
     * @name Get
     * @request GET:/user
     */
    get: (params: RequestParams = {}) =>
      this.request<UserEntity, any>({
        path: `/user`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name Delete
     * @request DELETE:/user
     */
    delete: (params: RequestParams = {}) =>
      this.request<UserEntity, any>({
        path: `/user`,
        method: "DELETE",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name Login
     * @request POST:/user/login
     */
    login: (params: RequestParams = {}) =>
      this.request<UserLoginRespDto, any>({
        path: `/user/login`,
        method: "POST",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name Register
     * @request POST:/user/register
     */
    register: (data: CreateUserDto, params: RequestParams = {}) =>
      this.request<UserEntity, any>({
        path: `/user/register`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  project = {
    /**
     * @description 创建新项目
     *
     * @tags project
     * @name Create
     * @request POST:/project
     */
    create: (data: CreateProjectDto, params: RequestParams = {}) =>
      this.request<ProjectEntity, any>({
        path: `/project`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description 获取项目信息
     *
     * @tags project
     * @name Get
     * @request GET:/project
     */
    get: (params: RequestParams = {}) =>
      this.request<ProjectEntity, any>({
        path: `/project`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description 更新项目信息
     *
     * @tags project
     * @name Update
     * @request PUT:/project
     */
    update: (data: UpdateProjectDto, params: RequestParams = {}) =>
      this.request<ProjectEntity, any>({
        path: `/project`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description 删除项目
     *
     * @tags project
     * @name Remove
     * @request DELETE:/project
     */
    remove: (params: RequestParams = {}) =>
      this.request<ProjectEntity, any>({
        path: `/project`,
        method: "DELETE",
        format: "json",
        ...params,
      }),

    /**
     * @description 获取工作区信息
     *
     * @tags project
     * @name GetWorkspace
     * @request GET:/project/workspace
     */
    getWorkspace: (params: RequestParams = {}) =>
      this.request<WorkspaceEntity, any>({
        path: `/project/workspace`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description 更新工作区信息
     *
     * @tags project
     * @name UpdateWorkspace
     * @request PUT:/project/workspace
     */
    updateWorkspace: (data: UpdateWorkspaceDto, params: RequestParams = {}) =>
      this.request<WorkspaceEntity, any>({
        path: `/project/workspace`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description 获取项目设置
     *
     * @tags project
     * @name GetSettings
     * @request GET:/project/settings
     */
    getSettings: (params: RequestParams = {}) =>
      this.request<SettingsEntity, any>({
        path: `/project/settings`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description 更新项目设置
     *
     * @tags project
     * @name UpdateSettings
     * @request PUT:/project/settings
     */
    updateSettings: (data: UpdateSettingsDto, params: RequestParams = {}) =>
      this.request<SettingsEntity, any>({
        path: `/project/settings`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  character = {
    /**
     * No description
     *
     * @name Create
     * @request POST:/character
     */
    create: (data: CreateCharacterDto, params: RequestParams = {}) =>
      this.request<CharacterEntity, any>({
        path: `/character`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name GetAll
     * @request GET:/character
     */
    getAll: (params: RequestParams = {}) =>
      this.request<CharacterEntity[], any>({
        path: `/character`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name Get
     * @request GET:/character/{id}
     */
    get: (id: number, params: RequestParams = {}) =>
      this.request<CharacterEntity, any>({
        path: `/character/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name Update
     * @request PUT:/character/{id}
     */
    update: (id: number, data: CreateCharacterDto, params: RequestParams = {}) =>
      this.request<CharacterEntity, any>({
        path: `/character/${id}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name Remove
     * @request DELETE:/character/{id}
     */
    remove: (id: number, params: RequestParams = {}) =>
      this.request<CharacterEntity, any>({
        path: `/character/${id}`,
        method: "DELETE",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name SearchByName
     * @request GET:/character/search/name
     */
    searchByName: (
      query: {
        text: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<CharacterEntity[], any>({
        path: `/character/search/name`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
  scene = {
    /**
     * No description
     *
     * @name Create
     * @request POST:/scene
     */
    create: (data: CreateSceneDto, params: RequestParams = {}) =>
      this.request<SceneEntity, any>({
        path: `/scene`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name Get
     * @request GET:/scene/{id}
     */
    get: (id: number, params: RequestParams = {}) =>
      this.request<SceneEntity, any>({
        path: `/scene/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name Update
     * @request PUT:/scene/{id}
     */
    update: (id: number, data: UpdateSceneDto, params: RequestParams = {}) =>
      this.request<SceneEntity, any>({
        path: `/scene/${id}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name Remove
     * @request DELETE:/scene/{id}
     */
    remove: (id: number, params: RequestParams = {}) =>
      this.request<SceneEntity, any>({
        path: `/scene/${id}`,
        method: "DELETE",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name SearchByName
     * @request GET:/scene/search/name
     */
    searchByName: (
      query: {
        text: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<SceneEntity[], any>({
        path: `/scene/search/name`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
  worldview = {
    /**
     * No description
     *
     * @name Create
     * @request POST:/worldview
     */
    create: (data: CreateWorldviewDto, params: RequestParams = {}) =>
      this.request<WorldviewEntity, any>({
        path: `/worldview`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name Get
     * @request GET:/worldview/{id}
     */
    get: (id: number, params: RequestParams = {}) =>
      this.request<WorldviewEntity, any>({
        path: `/worldview/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name Update
     * @request POST:/worldview/{id}
     */
    update: (id: number, data: UpdateWorldviewDto, params: RequestParams = {}) =>
      this.request<WorldviewEntity, any>({
        path: `/worldview/${id}`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name Remove
     * @request DELETE:/worldview/{id}
     */
    remove: (id: number, params: RequestParams = {}) =>
      this.request<WorldviewEntity, any>({
        path: `/worldview/${id}`,
        method: "DELETE",
        format: "json",
        ...params,
      }),
  };
}
