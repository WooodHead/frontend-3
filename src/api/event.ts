import { createQueryKeys } from '@lukemorales/query-key-factory'
import api from './api'

// export const getAllEvents = () => get<IEvent[]>('/event')

// export const getEvent = (id: string) => get<IEvent>(`/event/${id}`)

// export const getEventsFromUnit = (start: string) => get<IEvent[]>('/event', { start })

// export const getEventsFromRange = (start: string, end: string) => get<IEvent[]>('/event', { start, end })

// export const getEventDetail = (id: string) => get<IEventDetail>(`/event/${id}/detail`)

// export const createEventTodo = (id: string, todo: IEventTodo) => post(`/event/${id}/todo`, todo)

// export const updateEventTodo = (id: string, todo: Partial<IEventTodo>) => put(`/event/${id}/todo`, todo)

// export const updateEventContent = (id: string, content: Partial<IEventContent>) => put(`/event/${id}/content`, content)

// export const createEventRelation = (id: string, relation: IEventRelation) => post(`/event/${id}/relation`, relation)

// export const updateEventRelation = (id: string, relation: Partial<IEventRelation>) => put(`/event/${id}/relation`, relation)

export default createQueryKeys('event', {
  all: {
    queryKey: null,
    queryFn: () => api.event.getEvents(),
  },
  id: (id: string) => ({
    queryKey: [id],
    queryFn: () => api.event.getEvent(id),
  }),
  start: (start: string) => ({
    queryKey: [start],
    queryFn: () => api.event.getEvents({ start }),
    contextQueries: {
      end: (end: string) => ({
        queryKey: [end],
        queryFn: () => api.event.getEvents({ start, end }),
      }),
    },
  }),
})

interface IEventBase {
  id: string
  name: string

  start: string
  end: string

  color?: string
  description?: string
}

export interface IEvent extends IEventBase {
  type?: 'normal' | 'collection' | 'auto-collection'
  sub?: IEventBase[]
  super?: IEventBase[]
}

export interface IEventDetail extends IEvent {
  content: IEventContent
  todo: IEventTodo[]
  relation: IEventRelation[]
}

export interface IEventContent {
  content: string
}

export interface IEventTodo {
  id: string
  name: string
  content: string
}

/**
 * 事件的关联，用有向边表示
 */
export interface IEventRelation {
  id: string
  type: string // 关联的类型 id
  nar_line: string[] // 所属叙事线的 id

  from: string // 关联起始事件的 id
  to: string // 关联到的事件的 id

  description?: string
}

/**
 * 事件关联的类型
 * 关联必然是双向的，不同的方向有不同的称呼（原因/结果、后继于/预先于等）
 * 所以 `title` 字段是一个数组，分别表示两个方向的称呼
 */
export interface IEventRelationType {
  id: string

  title: [string[], string[]]

  description?: string
}
