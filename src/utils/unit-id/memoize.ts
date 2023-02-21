// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
export const memoize = <T>(_target: any, key: string, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T> => {
  const fType = descriptor.get ? 'get' : 'value'
  const fn = descriptor[fType]
  const char0 = String.fromCharCode(0)
  const memoizedCache = Symbol.for('memoizedCache')

  descriptor[fType] = function () {
    if (!this[memoizedCache]) { this[memoizedCache] = {} }
    let cacheKey = key

    for (const arg of arguments) {
      const type = typeof arg

      cacheKey += char0 + (
        (arg === null)
          ? 'null'
          : (arg === undefined)
              ? 'undefined'
              : (type === 'function')
                  ? arg
                  : (type === 'object' && arg.id)
                      ? arg.id
                      : (type === 'object' && arg.hashCode)
                          ? arg.hashCode()
                          : (type === 'object')
                              ? JSON.stringify(arg)
                              : arg
      )
    }

    if (!(cacheKey in this[memoizedCache])) {
      this[memoizedCache][cacheKey] = fn.apply(this, arguments)
    }

    return this[memoizedCache][cacheKey]
  }

  return descriptor
}
