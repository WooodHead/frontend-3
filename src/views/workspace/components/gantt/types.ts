import type { UnitID } from '@project-chiral/unit-system'

export interface IGanttData {
  id: string
  start: UnitID
  end: UnitID
  events: string[]
}

