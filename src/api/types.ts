import type { UseMutationOptions, UseQueryOptions } from '@tanstack/vue-query'
import type { AxiosError } from 'axios'

export type QueryOptions<D> = UseQueryOptions<D, AxiosError>
export type MutationOptions<T, D> = UseMutationOptions<D, AxiosError, T, unknown>
