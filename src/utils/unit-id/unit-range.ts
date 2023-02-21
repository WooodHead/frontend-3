import type { ConfigType } from 'dayjs'
import { UnitIDException } from './exception'
import { memoize } from './memoize'
import type { Unit, UnitConfigType } from './unit'
import { UnitID } from './unit-id'

export class UnitIDRange {
  readonly _unit: Unit

  constructor(
    readonly _start: UnitID,
    readonly _end: UnitID,
  ) {
    if (!_start.unit.isSame(_end.unit)) {
      throw new UnitIDException('UnitIDRange', 'unit not match')
    }

    this._unit = _start.unit
    this._start = this._start.start
    this._end = this._end.end

    if (!_start.isValid() || !_end.isValid()) { return }

    while (this._unit.upper) {
      const upper = this._unit.upper.toString()
      let diff
      switch (upper) {
        case 'century':
          diff = Math.floor((this._end._date.year() - this._start._date.year()) / 100)
          break
        case 'decade':
          diff = Math.floor((this._end._date.year() - this._start._date.year()) / 10)
          break
        default:
          diff = this._end._date.diff(this._start._date, upper)
          break
      }

      if (diff === 0) { break }
      this._unit = this._unit.upper
    }
  }

  static fromUnitID(start?: UnitID, end?: UnitID): UnitIDRange {
    start = start || UnitID.invalid()
    end = end || UnitID.invalid()

    if (start.isValid() && end.isValid()) {
      return start.isBefore(end)
        ? new UnitIDRange(start, end)
        : new UnitIDRange(end, start)
    }
    else if (start.isValid()) {
      return new UnitIDRange(start, UnitID.invalid().as(start.unit))
    }
    else if (end.isValid()) {
      return new UnitIDRange(UnitID.invalid().as(end.unit), end)
    }
    else {
      return UnitIDRange.invalid()
    }
  }

  static fromDayjs(unit: UnitConfigType, start?: ConfigType, end?: ConfigType): UnitIDRange {
    return new UnitIDRange(
      UnitID.fromDayjs(unit, start),
      UnitID.fromDayjs(unit, end),
    )
  }

  static fromJSON({ unit, start, end }: {
    unit: number
    start: Date
    end: Date
  }): UnitIDRange {
    return UnitIDRange.fromDayjs(unit, start, end)
  }

  static invalid(unit: UnitConfigType = 'century'): UnitIDRange {
    return new UnitIDRange(UnitID.invalid(unit), UnitID.invalid(unit))
  }

  toJSON() {
    if (!this.isValid()) { throw new UnitIDException('UnitIDRange', 'invalid') }
    return {
      unit: this._unit.order,
      start: this._start._date.toISOString(),
      end: this._end._date.toISOString(),
    }
  }

  toDate() {
    const startValid = this._start.isValid()
    const endValid = this._end.isValid()
    if (startValid && endValid) {
      return [this._start.toDate(), this._end.toDate()]
    }
    else if (startValid) { return [this._start.toDate()] }
    else if (endValid) { return [this._end.toDate()] }
    else { return [] }
  }

  static deserialize(str: string): UnitIDRange {
    const [unit, start, end] = str.split('_')
    return UnitIDRange.fromDayjs(parseInt(unit), start, end)
  }

  serialize() {
    return `${this._unit.order}_${this._start.format()}_${this._end.format()}`
  }

  get start(): UnitID { return this._start }

  get end(): UnitID { return this._end }

  get unit(): Unit { return this._unit }

  @memoize
  get ids(): UnitID[] {
    if (!this._start.isValid() || !this._end.isValid()) { return [] }

    return Array(this._end.diff(this._start) + 1)
      .fill(0)
      .map((_, i) => this._start.add(i))
  }

  @memoize
  get length() {
    return this._end.diff(this._start) + 1
  }

  add(count: number): UnitIDRange {
    return new UnitIDRange(this._start.add(count), this._end.add(count))
  }

  sub(count: number): UnitIDRange {
    return new UnitIDRange(this._start.sub(count), this._end.sub(count))
  }

  as(unit: UnitConfigType): UnitIDRange {
    return new UnitIDRange(this._start.as(unit), this._end.as(unit))
  }

  isIntersect(range: UnitIDRange) {
    if (!this.isValid() || !range.isValid()) { return false }

    return (this._start.isBefore(range._end) && this._end.isAfter(range._start))
            || (range._start.isBefore(this._end) && range._end.isAfter(this._start))
  }

  isValid() {
    return this._start.isValid() && this._end.isValid()
  }
}
