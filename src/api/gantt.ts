import { get, post } from './query'
import type { IEvent } from './type'

export const getOrigin = () => get<string>('/event/origin')

export const setOrigin = (origin: string) => post('/event/origin', { origin })

export const getAllEvents = () => get<IEvent[]>('/event')

export const getEvents = (start: string) => get<IEvent[]>('/event', { start })

export const getEventsRange = (start: string, end: string) => get<IEvent[]>('/event', { start, end })
