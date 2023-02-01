import type { IPosition, IPositionState } from '../layout'

export class ComponentStatus {
  id: string // 组件的id，同一个组件的不同id会导致独立的内部状态
  position?: IPosition // 组件位置，[column-start, row-start, column-end, row-end]
  state?: IPositionState // 组件所处的位置（角落，垂直，水平，全屏），用于动态调节组件显示的内容

  constructor(id: string, position?: IPosition, state?: IPositionState) {
    this.id = id
    this.position = position
    this.state = state
  }

  get positionId() {
    return `${this.position ?? this.id}`
  }
}
