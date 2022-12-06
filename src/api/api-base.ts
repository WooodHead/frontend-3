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

export interface ReadUserDto {
  /**
   * 用户名
   * @example "admin"
   */
  username: string;
  phone?: string;
  email?: string;
}

export interface DeleteUserDto {
  /**
   * 用户名
   * @example "admin"
   */
  username: string;
}

export interface UserLoginDto {
  /**
   * 用户名
   * @example "admin"
   */
  username: string;
  /** 密码 */
  password: string;
}

export interface UserLoginRespDto {
  /** jwt token */
  access_token: string;
}

export interface CreateUserDto {
  /**
   * 用户名
   * @example "admin"
   */
  username: string;
  /** 密码 */
  password: string;
  phone?: string;
  email?: string;
}

export interface CreateProjectDto {
  name: string;
  description?: string;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
  /** @format date-time */
  deletedAt?: string;
}

export interface ProjectEntity {
  id: number;
  name: string;
  description?: string;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
  /** @format date-time */
  deletedAt?: string;
}

export interface UpdateProjectDto {
  name?: string;
  description?: string;
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  updatedAt?: string;
  /** @format date-time */
  deletedAt?: string;
}

export interface LayoutEntity {
  id: number;
  /**
   * 布局位置
   * @example [1,2,1,3]
   */
  position: number[];
  /**
   * 布局位置ID
   * @example "lt"
   */
  positionID: string;
}

export interface SetLayoutDto {
  /**
   * 布局位置
   * @example [1,2,1,3]
   */
  position: number[];
  /**
   * 布局位置ID
   * @example "lt"
   */
  positionID: string;
}

export interface CreateCharacterDto {
  name: string;
  alias: string[];
  description?: string;
  start?: string;
  end?: string;
}

export type UpdateCharacterDto = object;

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
  /**
   * No description
   *
   * @name AppControllerGetHello
   * @request GET:/
   */
  appControllerGetHello = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/`,
      method: "GET",
      ...params,
    });

  apiDocs = {
    /**
     * No description
     *
     * @name AppControllerGetApiDocs
     * @request GET:/api-docs
     */
    appControllerGetApiDocs: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api-docs`,
        method: "GET",
        ...params,
      }),
  };
  user = {
    /**
     * @description Get all users
     *
     * @tags user
     * @name GetAllUsers
     * @request GET:/user
     */
    getAllUsers: (params: RequestParams = {}) =>
      this.request<ReadUserDto[], any>({
        path: `/user`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name DeleteUser
     * @request DELETE:/user
     */
    deleteUser: (data: DeleteUserDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/user`,
        method: "DELETE",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name GetUser
     * @request GET:/user/{username}
     */
    getUser: (username: string, params: RequestParams = {}) =>
      this.request<ReadUserDto, any>({
        path: `/user/${username}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description 登录
     *
     * @tags user
     * @name Login
     * @request POST:/user/login
     */
    login: (data: UserLoginDto, params: RequestParams = {}) =>
      this.request<UserLoginRespDto, any>({
        path: `/user/login`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description 注册
     *
     * @tags user
     * @name Register
     * @request POST:/user/register
     */
    register: (data: CreateUserDto, params: RequestParams = {}) =>
      this.request<ReadUserDto, void>({
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
     * No description
     *
     * @tags project
     * @name CreateProject
     * @request POST:/project
     */
    createProject: (data: CreateProjectDto, params: RequestParams = {}) =>
      this.request<ProjectEntity, any>({
        path: `/project`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags project
     * @name ProjectControllerFindOne
     * @request GET:/project/{id}
     */
    projectControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<ProjectEntity, any>({
        path: `/project/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags project
     * @name ProjectControllerUpdate
     * @request PATCH:/project/{id}
     */
    projectControllerUpdate: (id: string, data: UpdateProjectDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/project/${id}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags project
     * @name ProjectControllerRemove
     * @request DELETE:/project/{id}
     */
    projectControllerRemove: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/project/${id}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * No description
     *
     * @tags project/workspace
     * @name GetLayout
     * @request GET:/project/workspace/layout
     */
    getLayout: (params: RequestParams = {}) =>
      this.request<LayoutEntity, any>({
        path: `/project/workspace/layout`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags project/workspace
     * @name SetLayout
     * @request POST:/project/workspace/layout
     */
    setLayout: (data: SetLayoutDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/project/workspace/layout`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags project/workspace
     * @name GetGanttOrigin
     * @request GET:/project/workspace/gantt/origin
     */
    getGanttOrigin: (params: RequestParams = {}) =>
      this.request<string, any>({
        path: `/project/workspace/gantt/origin`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags project/workspace
     * @name SetGanttOrigin
     * @request POST:/project/workspace/gantt/origin
     */
    setGanttOrigin: (data: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/project/workspace/gantt/origin`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),
  };
  character = {
    /**
     * No description
     *
     * @name CharacterControllerCreate
     * @request POST:/character
     */
    characterControllerCreate: (data: CreateCharacterDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/character`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name CharacterControllerFindAll
     * @request GET:/character
     */
    characterControllerFindAll: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/character`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @name CharacterControllerFindOne
     * @request GET:/character/{id}
     */
    characterControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/character/${id}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @name CharacterControllerUpdate
     * @request PATCH:/character/{id}
     */
    characterControllerUpdate: (id: string, data: UpdateCharacterDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/character/${id}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name CharacterControllerRemove
     * @request DELETE:/character/{id}
     */
    characterControllerRemove: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/character/${id}`,
        method: "DELETE",
        ...params,
      }),
  };
}
