import type { UnitID } from '@project-chiral/unit-system'

export class OrderedArray<T, K> {
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
      }
      else if (cmp > 0) {
        lowerBound = mid + 1
      }
      else {
        lowerBound = mid
        break
      }
    }

    this._data.splice(lowerBound, 0, [key, data])
  }

  remove(key: K) {
    const index = this.order(key)
    if (index >= 0) {
      this._data.splice(index, 1)
    }
  }

  order(key: K) {
    return this._data.findIndex(([k]) => this._comparor(k, key) === 0)
  }

  clear() {
    this._data = []
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
  }
  else if (a.isAfter(b)) {
    return 1
  }
  else {
    return 0
  }
}
