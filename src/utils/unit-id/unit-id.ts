import type { ConfigType, Dayjs, UnitType } from 'dayjs'
import Date from 'dayjs'
import hash from 'object-hash'
import { UnitIDException } from './exception'
import { memoize } from './memoize'
import type { UnitConfigType } from './unit'
import { UNITS, Unit } from './unit'
import { UnitIDRange } from './unit-range'

export class UnitID {
  readonly _uid: string

  constructor(readonly _date: Dayjs, readonly _unit: Unit) {
    const uType = this._unit.toString()
    const century = this._date.year() / 100
    const decade = this._date.year() / 10
    switch (uType) {
      case 'century':
        this._uid = hash([century])
        break
      case 'decade':
        this._uid = hash([century, decade])
        break
      default: {
        const rest = UNITS.slice(2, this._unit._order + 1).map((unit) =>
          this._date.get(unit as UnitType)
        )
        this._uid = hash([century, decade, ...rest])
        break
      }
    }
  }

  static fromDayjs(unit: UnitConfigType, dateConfig?: ConfigType): UnitID {
    return new UnitID(Date(dateConfig), Unit.fromUnit(unit))
  }

  static lowerBound() {
    return this.fromDayjs('century', '-271821')
  }

  static upperBound() {
    return this.fromDayjs('century', '275759')
  }

  static invalid(unit: UnitConfigType = 'century') {
    return this.fromDayjs(unit, 'invalid')
  }

  static deserialize(str: string): UnitID {
    const [unit, config] = str.split('_')
    const unitOrder = parseInt(unit)
    if (config === undefined || isNaN(unitOrder)) {
      throw new UnitIDException('UnitID deserialize', 'invalid format')
    }
    return new UnitID(Date(config), Unit.fromUnit(parseInt(unit)))
  }

  serialize() {
    return `${this._unit.order}_${this.format()}`
  }

  as(unit: UnitConfigType): UnitID {
    return new UnitID(this._date, Unit.fromUnit(unit))
  }

  add(value: number): UnitID {
    if (!this.isValid()) {
      return UnitID.invalid(this.unit)
    }
    const uType = this._unit.toString()
    switch (uType) {
      case 'century':
        return new UnitID(this._date.add(value * 100, 'year'), this._unit)
      case 'decade':
        return new UnitID(this._date.add(value * 10, 'year'), this._unit)
      case 'date':
        return new UnitID(this._date.add(value, 'day'), this._unit)
      default:
        return new UnitID(this._date.add(value, uType), this._unit)
    }
  }

  sub(value: number): UnitID {
    return this.add(-value)
  }

  get date() {
    return this._date
  }

  get unit() {
    return this._unit
  }

  @memoize
  get next(): UnitID {
    return this.add(1)
  }

  @memoize
  get prev(): UnitID {
    return this.sub(1)
  }

  diff(date: UnitID, milliSecond = false): number {
    if (!this.isValid() || !date.isValid()) {
      return NaN
    }

    if (!this._unit.isSame(date._unit)) {
      throw new UnitIDException('UnitID diff', 'unit not match')
    }

    if (milliSecond) {
      return this._date.diff(date._date, 'millisecond')
    }

    const uType = this._unit.toString()
    const start = date._date
    const end = this._date

    switch (uType) {
      case 'century':
        return Math.floor(end.diff(start, 'year') / 100)
      case 'decade':
        return Math.floor(end.diff(start, 'year') / 10)
      case 'date':
        return end.diff(start, 'day')
      default:
        return end.diff(start, uType)
    }
  }

  /**
   * 获取当前时间单位下的最小时间，即：当前时间单位以下的时间全部设置为最小值
   */
  @memoize
  get start(): UnitID {
    if (!this.isValid()) {
      return UnitID.invalid(this.unit)
    }

    const uType = this._unit.toString()
    switch (uType) {
      case 'century': {
        const century = Math.floor(this._date.year() / 100) * 100
        return new UnitID(this._date.startOf('year').year(century), this._unit)
      }
      case 'decade': {
        const decade = Math.floor(this._date.year() / 10) * 10
        return new UnitID(this._date.startOf('year').year(decade), this._unit)
      }
      default:
        return new UnitID(this._date.startOf(uType), this._unit)
    }
  }

  get isStart() {
    if (!this.isValid()) {
      return false
    }

    const uType = this._unit.toString()
    if (uType === 'century') {
      return this._date.year() % 100 === 0
    } else if (uType === 'decade') {
      return this._date.year() % 10 === 0
    } else {
      return this._date.startOf(uType).isSame(this._date)
    }
  }

  /**
   * 获取当前时间单位下的最大时间，即：当前时间单位以下的时间全部设置为最大值
   */
  @memoize
  get end(): UnitID {
    if (!this.isValid()) {
      return UnitID.invalid(this.unit)
    }

    const uType = this._unit.toString()
    switch (uType) {
      case 'century': {
        const century = Math.floor(this._date.year() / 100) * 100 + 99
        return new UnitID(this._date.endOf('year').year(century), this._unit)
      }
      case 'decade': {
        const decade = Math.floor(this._date.year() / 10) * 10 + 9
        return new UnitID(this._date.endOf('year').year(decade), this._unit)
      }
      default:
        return new UnitID(this._date.endOf(uType), this._unit)
    }
  }

  get isEnd() {
    if (!this.isValid()) {
      return false
    }

    const uType = this._unit.toString()
    if (uType === 'century') {
      return this._date.year() % 100 === 99
    } else if (uType === 'decade') {
      return this._date.year() % 10 === 9
    } else {
      return this._date.endOf(uType).isSame(this._date)
    }
  }

  get uid() {
    return this._uid
  }

  @memoize
  get parent(): UnitID {
    if (!this.isValid()) {
      return UnitID.invalid(this.unit)
    }

    const upperUnit = this._unit.upper
    if (!upperUnit) {
      throw new UnitIDException('UnitID parent', 'century has no parent')
    }
    return this.as(upperUnit)
  }

  /**
   * 以UnitIDRange的形式表达的当前时间单位的所有子时间单位
   */
  @memoize
  get childrenRange(): UnitIDRange {
    if (!this.isValid()) {
      return UnitIDRange.invalid(this.unit)
    }

    const lowerUnit = this._unit.lower
    if (!lowerUnit) {
      throw new UnitIDException(
        'UnitID childrenRange',
        'second has no children'
      )
    }
    const start = this.start.as(lowerUnit)
    const end = this.end.as(lowerUnit)
    return new UnitIDRange(start, end)
  }

  /**
   * 当前时间单位所在的单位范围，如1月18号处于1月1日～1月31日的范围内
   */
  @memoize
  get range() {
    if (!this.isValid()) {
      return UnitIDRange.invalid(this.unit)
    }
    return UnitIDRange.fromUnitID(this.parent, this.parent).as(this._unit)
  }

  @memoize
  get children(): UnitID[] {
    if (!this.isValid()) {
      return []
    }
    return this.childrenRange.ids
  }

  @memoize
  get firstChild() {
    if (!this.isValid()) {
      return UnitID.invalid(this.unit)
    }
    const lowerUnit = this._unit.lower
    if (!lowerUnit) {
      throw new UnitIDException('UnitID firstChild', 'second has no children')
    }
    return this.start.as(lowerUnit)
  }

  @memoize
  get lastChild() {
    if (!this.isValid()) {
      return UnitID.invalid(this.unit)
    }
    const lowerUnit = this._unit.lower
    if (!lowerUnit) {
      throw new UnitIDException('UnitID lastChild', 'second has no children')
    }
    return this.end.as(lowerUnit)
  }

  toString() {
    if (!this.isValid()) {
      return 'invalid'
    }

    const startIdx = this._unit.isLower('decade') ? 2 : 0 // 单位在年以下，只显示年份，不显示世纪
    return UNITS.slice(startIdx, this._unit.order + 1)
      .map((unit) => this.as(unit).toUnitString())
      .join('')
  }

  toUnitString() {
    if (!this.isValid()) {
      return 'invalid'
    }

    const uType = this._unit.toString()
    switch (uType) {
      case 'century':
        return `${Math.floor(this._date.year() / 100) + 1}世纪`
      case 'decade': {
        const decade = (this._date.year() % 100) - (this._date.year() % 10)
        if (decade === 0) {
          return '世纪初'
        } else {
          return `${decade}年代`
        }
      }
      case 'year':
        return `${this._date.year()}年`
      case 'month':
        return `${this._date.month() + 1}月`
      case 'date':
        return `${this._date.date()}日`
      case 'hour':
        return `${this._date.hour()}时`
      case 'minute':
        return `${this._date.minute()}分`
      case 'second':
        return `${this._date.second()}秒`
    }
  }

  toBriefString() {
    if (!this.isValid()) {
      return 'invalid'
    }

    const uType = this._unit.toString()
    switch (uType) {
      case 'century':
      case 'year':
        return this.toUnitString()
      case 'decade':
        return `${this.children[0]}代`
      default:
        return `${this.parent.toUnitString()}${this.toUnitString()}`
    }
  }

  toJSON() {
    if (!this.isValid()) {
      return { unit: 0, date: null }
    }

    return {
      unit: this._unit.order,
      date: this._date.toDate(),
    }
  }

  toDate() {
    return this._date.toDate()
  }

  format() {
    if (!this.isValid()) {
      return 'invalid'
    }
    return this._date.format()
  }

  isBefore(date: UnitID) {
    if (!this.isValid() || !this._unit.isSame(date._unit)) {
      return false
    }
    return this._date.isBefore(date._date)
  }

  isAfter(date: UnitID) {
    if (!this.isValid() || !this._unit.isSame(date._unit)) {
      return false
    }
    return this._date.isAfter(date._date)
  }

  isSame({ _date, _unit }: UnitID) {
    if (!this.isValid() || !this._unit.isSame(_unit)) {
      return false
    }
    const uType = this._unit.toString()
    switch (uType) {
      case 'century':
      case 'decade':
        return this._date.isSame(_date, 'year')
      default:
        return this._date.isSame(_date, uType)
    }
  }

  isBetween(
    { _date: startDate, _unit: startUnit }: UnitID,
    { _date: endDate, _unit: endUnit }: UnitID,
    d?: '()' | '[]' | '[)' | '(]'
  ) {
    if (
      !this.isValid() ||
      !this._unit.isSame(startUnit) ||
      !this._unit.isSame(endUnit)
    ) {
      return false
    }
    if (endDate.isBefore(startDate)) {
      return false
    }

    const uType = this._unit.toString()
    switch (uType) {
      case 'century':
      case 'decade':
        return this._date.isBetween(startDate, endDate, 'year', d)
      default:
        return this._date.isBetween(startDate, endDate, uType, d)
    }
  }

  isValid() {
    return this._date.isValid()
  }
}
