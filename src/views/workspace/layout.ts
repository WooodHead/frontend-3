export enum IPositionState { Corner, Vertical, Horizontal, Full }
export type IPosition = [number, number, number, number]
export type IPositionID = 'lt' | 'rt' | 'lb' | 'rb' | 'top' | 'bottom' | 'left' | 'right' | 'full'

enum Position { LT, RT, LB, RB }

const LT = Position.LT
const RT = Position.RT
const LB = Position.LB
const RB = Position.RB

const TABLE: Record<IPositionID, Position[]> = {
  lt: [LT],
  rt: [RT],
  lb: [LB],
  rb: [RB],
  top: [LT, RT],
  bottom: [LB, RB],
  left: [LT, LB],
  right: [RT, RB],
  full: [LT, RT, LB, RB],
}

const POSITON: { [id: string]: IPosition } = {
  lt: [1, 2, 1, 2],
  rt: [2, 3, 1, 2],
  lb: [1, 2, 2, 3],
  rb: [2, 3, 2, 3],
  top: [1, 3, 1, 2],
  bottom: [1, 3, 2, 3],
  left: [1, 2, 1, 3],
  right: [2, 3, 1, 3],
  full: [1, 3, 1, 3],
}

export class LayoutStatus {
  occupy: Set<Position>
  state: IPositionState

  constructor(id: string, occupy: Position[]) {
    switch (id) {
      case 'lt':
      case 'rt':
      case 'lb':
      case 'rb':
        this.state = IPositionState.Corner
        break
      case 'top':
      case 'bottom':
        this.state = IPositionState.Horizontal
        break
      case 'left':
      case 'right':
        this.state = IPositionState.Vertical
        break
      case 'full':
        this.state = IPositionState.Full
        break
      default:
        throw new Error(`Invalid position id: ${id}`)
    }

    this.occupy = new Set(occupy)
  }

  intersectionWith(other: LayoutStatus) {
    for (const pos of other.occupy) {
      if (this.occupy.has(pos)) { return true }
    }
    return false
  }
}

export class Layout {
  private _components: {
    id: string
    position: IPosition
    status: LayoutStatus
  }[] = []

  get components() {
    return this._components.map(({ id, position, status: { state } }) => ({ id, position, state }))
  }

  insert(handlerID: string, dropID: IPositionID) {
    const status = new LayoutStatus(dropID, TABLE[dropID])
    const position = POSITON[dropID]

    this._components = this._components
      .filter(({ status: _status, id }) =>
        id !== handlerID
        && !_status.intersectionWith(status))

    this._components.push({ id: handlerID, position, status })
  }

  has(id: string) {
    return this._components.some(({ id: _id }) => _id === id)
  }
}
