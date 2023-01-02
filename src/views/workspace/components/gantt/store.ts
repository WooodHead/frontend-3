import type { UnitID } from '@project-chiral/unit-system'
import { UnitIDRange } from '@project-chiral/unit-system'
import { UNIT_WIDTH } from './const'
import type { IGanttData } from './types'
import createStore from '@/utils/createStore'

export const { registerStore, useStore } = createStore('gantt', {
  state: () => ({
    fullMode: true, // 完全模式

    dragging: false, // 当前视图是否正在被拖拽

    lock: false, // 是否锁定可见事件列表，锁定时当事件不在视区内时也不会被移除

    eventScrollTop: 0, // 侧边栏滚动距离，用于与主视图同步

    origin: undefined as (UnitID | undefined), // 当前视图的原点单位

    viewPort: null as (HTMLDivElement | null), // 当前视区的 DOM
    viewPortWidth: 0, // 当前视区的宽度

    unitQueue: [] as UnitID[], // 当前已加载的单位队列，用于渲染

    visibleUnit: undefined as (UnitID | undefined), // 当前视图的可见单位（两个单位均可见时，可见面积更大的被认为是可见单位）

    _offset: 0, // 主视图的偏移量
    offsetUpperBound: undefined as (number | undefined), // 主视图的偏移量上限
    offsetLowerBound: undefined as (number | undefined), // 主视图的偏移量下限
  }),
  getters: {
    offset: state => computed({
      get: () => state._offset,
      set: value => {
        if (
          state.offsetUpperBound !== undefined
          && value > state.offsetUpperBound
        ) {
          state._offset = state.offsetUpperBound
        }
        else if (
          state.offsetLowerBound !== undefined
          && value < (state.offsetLowerBound + state.viewPortWidth)
        ) {
          state._offset = (state.offsetLowerBound + state.viewPortWidth)
        }
        else { state._offset = value }
      },
    }),

    unitOffset: state => (id: UnitID) => {
      const origin = state.origin
      if (!origin || !id) { return 0 }
      if (!origin.unit.isSame(id.unit)) {
        throw new Error('unit not match')
      }

      return id.diff(origin)
    },

    subUnitOffset: state => (id: UnitID) => {
      const origin = state.origin
      if (!origin || !id) { return 0 }
      if (!origin.unit.isSame(id.unit)) {
        throw new Error('unit not match')
      }

      const zero = origin.firstChild as UnitID
      const now = id.firstChild as UnitID

      return now.diff(zero)
    },

    unitRange: ({ unitQueue }) => {
      const first = unitQueue[0]
      const last = unitQueue[unitQueue.length - 1]
      if (!first || !last) { return undefined }
      return UnitIDRange.fromUnitID(first, last)
    },

    subUnitRange: state => {
      const first = state.unitQueue[0]
      const last = state.unitQueue[state.unitQueue.length - 1]
      if (!first || !last) { return undefined }
      return UnitIDRange.fromUnitID(first.firstChild, last.lastChild)
    },
  },
  actions: {
    _reset() {
      this.origin = undefined
      this.eventScrollTop = 0
      this.unitQueue = []
      this._offset = -1
    },

    init(_origin: UnitID) {
      this._reset()
      this.origin = _origin
      this.unitQueue = [_origin]
      this.loadLeft(4)
      this.loadRight(4)
    },

    initWithData({ start, end }: IGanttData) {
      this.fullMode = false
      const range = UnitIDRange.fromUnitID(start, end)

      const firstChild = start.children[0]
      const lastChild = end.children[end.children.length - 1]

      this.offsetUpperBound = 0
      this.offsetLowerBound = -(lastChild.diff(firstChild) + 1) * UNIT_WIDTH

      this.origin = start

      this.unitQueue = range.ids
    },

    loadLeft(count = 1) {
      const first = this.unitQueue[0]
      const prevs = Array(count).fill(0).map((_, i) => first.sub(count - i))
      this.unitQueue.unshift(...prevs)
      if (this.unitQueue.length > 20) { this.removeRight(count) }
    },

    loadRight(count = 1) {
      const last = this.unitQueue[this.unitQueue.length - 1]
      const nexts = Array(count).fill(0).map((_, i) => last.add(i + 1))
      this.unitQueue.push(...nexts)
      if (this.unitQueue.length > 20) { this.removeLeft(count) }
    },

    removeLeft(count = 1) {
      this.unitQueue.splice(0, count)
    },

    removeRight(count = 1) {
      this.unitQueue.splice(this.unitQueue.length - count)
    },

    navigateTo(unit: UnitID) {
      const start = this.unitQueue[0]
      const end = this.unitQueue[this.unitQueue.length - 1]

      if (unit.isBetween(start, end, '[]')) {
        this.offset.value = -this.subUnitOffset(unit) * UNIT_WIDTH
      }
      else {
        this.init(unit)
      }
    },

    navigateToPrev() {
      const prev = this.visibleUnit?.prev
      if (prev) { this.navigateTo(prev) }
    },

    navigateToNext() {
      const next = this.visibleUnit?.next
      if (next) { this.navigateTo(next) }
    },
  },
})
