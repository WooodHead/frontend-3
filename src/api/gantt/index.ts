import { get, post } from '../query'

export const getOrigin = () => get<string>('/event/origin')

export const setOrigin = (origin: string) => post('/event/origin', { origin })
