import type { UnitID } from '@/utils/unit-id'

export interface IGanttData {
  id: string
  start: UnitID
  end: UnitID
  events: string[]
}

