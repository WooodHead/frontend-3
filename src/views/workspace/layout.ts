export enum IPositionState { Corner, Vertical, Horizontal, Full }
export type IPosition = [number, number, number, number]
export type IPositionID = 'lt' | 'rt' | 'lb' | 'rb' | 'top' | 'bottom' | 'left' | 'right' | 'full'
export type ILayout = { id: string; position: IPosition }[]

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

const ID_TO_POSITION = new Map<string, IPosition>(Object.entries({
  lt: [1, 2, 1, 2],
  rt: [2, 3, 1, 2],
  lb: [1, 2, 2, 3],
  rb: [2, 3, 2, 3],
  top: [1, 3, 1, 2],
  bottom: [1, 3, 2, 3],
  left: [1, 2, 1, 3],
  right: [2, 3, 1, 3],
  full: [1, 3, 1, 3],
}))

const POSITION_TO_ID = new Map(
  Array.from(ID_TO_POSITION.entries())
    .map(([id, position]) => [position.join(''), id] as [string, IPositionID]),
)

export class LayoutStatus {
  id: IPositionID
  occupy: Set<Position>
  state: IPositionState

  constructor(position: IPosition) {
    this.id = POSITION_TO_ID.get(position.join(''))!

    switch (this.id) {
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
    }

    this.occupy = new Set(TABLE[this.id])
  }

  intersectionWith(other: LayoutStatus) {
    for (const pos of other.occupy) {
      if (this.occupy.has(pos)) { return true }
    }
    return false
  }
}

export class Layout {
  _components: {
    id: string
    position: IPosition
    status: LayoutStatus
  }[] = []

  static deserialize(data: ILayout) {
    const layout = new Layout()
    layout._components = data.map(({ id, position }) => ({
      id, position, status: new LayoutStatus(position),
    }))
    return layout
  }

  serialize(): ILayout {
    return this._components.map(({ id, position }) => ({ id, position }))
  }

  get components() {
    return this._components.map(({ id, position, status: { state } }) => ({ id, position, state }))
  }

  insert(handlerID: string, dropID: IPositionID) {
    const position = ID_TO_POSITION.get(dropID)!
    const status = new LayoutStatus(position)

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
