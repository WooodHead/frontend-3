export type IEvent = {
    id: string
    name: string
    description?: string
    start: string
    end: string
    subEvents?: string[]
    type?: 'normal' | 'collection' | 'auto-collection'
}