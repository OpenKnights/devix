import type { DeepCloneFn } from './types'

import { isType } from './typeof'

//! Function Shallow Copy
export function shallowClone<T = any>(source: T): T {
  if (isType('array', source)) return (source as any[]).slice() as T
  if (isType('object', source)) return { ...source } as T

  return source
}

//! Function Deep Copy
const isFormat = (target: any) =>
  isType('object', target) || isType('function', target)

function handleSpeciBoundar<T = any>(
  source: any,
  dpClone: DeepCloneFn,
  hash: WeakMap<object, T>
) {
  if (isType('symbol', source)) return Symbol(source.description)

  if (!isFormat(source)) return source

  if (isType('set', source)) {
    const newSet = new Set()
    source.forEach((value: T) => newSet.add(dpClone(value, hash)))

    return newSet
  }
  if (isType('map', source)) {
    const newMap = new Map()
    source.forEach((value: T, key: T) => newMap.set(key, dpClone(value, hash)))
    return newMap
  }

  return null
}

export function deepClone(source: any, hash = new WeakMap<object, any>()) {
  if (hash.get(source)) return hash.get(source)

  const result = handleSpeciBoundar(source, deepClone, hash)
  if (result) return result

  const isArray = isType('array', source)
  const cloneObject: any = isArray ? [] : {}

  hash.set(source, cloneObject)

  if (isArray) {
    ;(source as Array<any>).forEach((item, index) => {
      cloneObject[index] = deepClone(item, hash)
    })
  } else {
    Object.keys(source).forEach((key) => {
      cloneObject[key] = deepClone(source[key], hash)
    })
    Object.getOwnPropertySymbols(source).forEach((sym) => {
      cloneObject[Symbol(sym.description)] = deepClone(source[sym], hash)
    })
  }

  return cloneObject
}
