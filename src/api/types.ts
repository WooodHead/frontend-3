import type { UseMutationOptions, UseQueryOptions } from '@tanstack/vue-query'
import type { AxiosError } from 'axios'

export type QueryOptions<D> = Omit<UseQueryOptions<D, AxiosError, unknown, any>, 'queryKey' | 'queryFn' | 'select'>
export type MutationOptions<T, D> = Omit<UseMutationOptions<D, AxiosError, T, unknown>, 'mutationFn'>
