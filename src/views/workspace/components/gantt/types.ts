import type { UnitID } from '@project-chiral/unit-id'

export interface IGanttData {
  id: string
  start: UnitID
  end: UnitID
  events: string[]
}

