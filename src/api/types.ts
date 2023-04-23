import type { UseMutationOptions, UseQueryOptions } from '@tanstack/vue-query'
import type { AxiosError } from 'axios'

export type ApiError = AxiosError<{
  statusCode: number
  message: string
}>

export type QueryOptions<D> = Omit<
  UseQueryOptions<D, ApiError, unknown, any>,
  'queryKey' | 'queryFn' | 'select'
>
export type MutationOptions<T, D> = Omit<
  UseMutationOptions<D, ApiError, T, unknown>,
  'mutationFn'
>
