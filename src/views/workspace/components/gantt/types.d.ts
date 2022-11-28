import { UnitID } from '@project-chiral/unit-system'

export type IGanttData = {
    id: string
    start: UnitID
    end: UnitID
    events: string[]
}

