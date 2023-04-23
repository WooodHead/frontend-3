import type { UnitID, UnitIDRange } from '@/utils/unit-id'

export class OrderedArray<T extends Record<string, any>, K> {
  _data: [K, T][]
  _comparor: (a: K, b: K) => number

  constructor(comparor: (a: K, b: K) => number) {
    this._data = []
    this._comparor = comparor
  }

  insert(key: K, data: T) {
    let lowerBound = 0
    let upperBound = this._data.length

    while (lowerBound < upperBound) {
      const mid = lowerBound + Math.floor((upperBound - lowerBound) / 2)
      const [k] = this._data[mid]
      const cmp = this._comparor(key, k)
      if (cmp < 0) {
        upperBound = mid
      } else if (cmp > 0) {
        lowerBound = mid + 1
      } else {
        lowerBound = mid
        break
      }
    }

    this._data.splice(lowerBound, 0, [key, data])
  }

  remove(key: K, data?: Partial<T>) {
    const index = this.order(key, data)
    if (index >= 0) {
      this._data.splice(index, 1)
    }
  }

  removeByData(data: Partial<T>) {
    const indexes: number[] = []
    for (const [i, [, d]] of this._data.entries()) {
      for (const [key, value] of Object.entries(data)) {
        if (d[key] !== value) {
          continue
        }
      }
      indexes.push(i)
    }
    for (const i of indexes) {
      this._data.splice(i, 1)
    }
  }

  order(key: K, data?: Partial<T>) {
    return this._data.findIndex(([k, v]) => {
      if (this._comparor(k, key) !== 0) {
        return false
      }
      if (!data) {
        return true
      } else {
        for (const [key, value] of Object.entries(data)) {
          if (v[key] !== value) {
            return false
          }
        }
        return true
      }
    })
  }

  orderByData(data: Partial<T>) {
    return this._data.findIndex(([, v]) => {
      for (const [key, value] of Object.entries(data)) {
        if (v[key] !== value) {
          return false
        }
      }
      return true
    })
  }

  clear() {
    this._data = []
  }

  contains(key: K, data?: Partial<T>) {
    return this.order(key, data) >= 0
  }

  get keys() {
    return this._data.map(([k]) => k)
  }

  get data() {
    return this._data.map(([, d]) => d)
  }
}

export const UnitIDComparor = (a: UnitID, b: UnitID) => {
  if (a.isBefore(b)) {
    return -1
  } else if (a.isAfter(b)) {
    return 1
  } else {
    return 0
  }
}

export const UnitIDRangeComparor = (a: UnitIDRange, b: UnitIDRange) => {
  if (a.start.isBefore(b.start)) {
    return -1
  } else if (a.start.isAfter(b.start)) {
    return 1
  } else if (a.end.isBefore(b.end)) {
    return -1
  } else if (a.end.isAfter(b.end)) {
    return 1
  } else {
    return 0
  }
}
