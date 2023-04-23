import { UnitIDException } from './exception'

export const UNITS = [
  'century',
  'decade',
  'year',
  'month',
  'date',
  'hour',
  'minute',
  'second',
] as const
const LENGTH = 8

export type IUnit = (typeof UNITS)[number]
export type UnitConfigType = IUnit | number | Unit

export class Unit {
  constructor(readonly _order: number = 4) {
    if (_order < 0 || _order >= LENGTH) {
      throw new UnitIDException(
        'Unit',
        `expect 0 < order < ${LENGTH}, got ${_order}`
      )
    }
  }

  static fromUnit(unit: UnitConfigType) {
    if (typeof unit === 'string') {
      if (!UNITS.includes(unit)) {
        throw new UnitIDException(
          'Unit fromUnit',
          `expect unit in ${UNITS}, got ${unit}`
        )
      }
      return new Unit(UNITS.indexOf(unit))
    } else if (typeof unit === 'number') {
      return new Unit(unit)
    }
    return unit
  }

  get upper(): Unit | undefined {
    return this._order > 0 ? new Unit(this._order - 1) : undefined
  }

  get lower(): Unit | undefined {
    return this._order < LENGTH - 1 ? new Unit(this._order + 1) : undefined
  }

  get order() {
    return this._order
  }

  isSame(unit: UnitConfigType) {
    return this._order === Unit.fromUnit(unit)._order
  }

  isUpper(unit: UnitConfigType) {
    return this._order < Unit.fromUnit(unit)._order
  }

  isLower(unit: UnitConfigType) {
    return this._order > Unit.fromUnit(unit)._order
  }

  toString() {
    return UNITS[this._order]
  }
}
