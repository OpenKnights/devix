import { isArray, isPrimitive, isSymbol, isType } from './typed'

/**
 * Creates a shallow copy of the given obejct/value.
 * @param {*} obj value to shallowClone
 * @returns {*} shallow clone of the given value
 */
export const shallowClone = <T>(obj: T): T => {
  // Primitive values do not need cloning.
  if (isPrimitive(obj)) {
    return obj
  }

  // Binding a function to an empty object creates a
  // copy function.
  if (typeof obj === 'function') {
    return obj.bind({})
  }

  // Access the constructor and create a new object.
  // This method can create an array as well.
  const newObj = new ((obj as object).constructor as { new (): T })()

  // Assign the props.
  Object.getOwnPropertyNames(obj).forEach((prop) => {
    // Bypass type checking since the primitive cases
    // are already checked in the beginning
    ;(newObj as any)[prop] = (obj as any)[prop]
  })

  return newObj
}

/**
 * Deep clones a value, supporting complex types like objects, arrays, Map, and Set
 *
 * @template T - The type of the value to be cloned
 * @param {T} source - The source value to clone
 * @param {WeakMap<object, any>} [hash] - Hash map for handling circular references
 * @returns {T} The cloned new value
 */
export function deepClone<T>(source: T, hash = new WeakMap<object, any>()): T {
  // Handle circular references
  if (hash.has(source as object)) {
    return hash.get(source as object)
  }

  // Handle Symbol
  if (isSymbol(source)) {
    return Symbol((source as symbol).description) as T
  }

  // Handle primitive types
  if (isPrimitive(source)) {
    return source
  }

  // Handle Set
  if (isType('set', source)) {
    const newSet = new Set()
    hash.set(source as object, newSet)
    ;(source as Set<any>).forEach((value) => {
      newSet.add(deepClone(value, hash))
    })
    return newSet as T
  }

  // Handle Map
  if (isType('map', source)) {
    const newMap = new Map()
    hash.set(source as object, newMap)
    ;(source as Map<any, any>).forEach((value, key) => {
      const clonedKey = isPrimitive(key) ? key : deepClone(key, hash)
      newMap.set(clonedKey, deepClone(value, hash))
    })
    return newMap as T
  }

  // Handle arrays and objects
  const isArr = isArray(source)
  const cloneObject: any = isArr ? [] : {}
  hash.set(source as object, cloneObject)

  if (isArr) {
    ;(source as any[]).forEach((item, index) => {
      cloneObject[index] = deepClone(item, hash)
    })
  } else {
    // Clone string key properties
    Object.keys(source as object).forEach((key) => {
      cloneObject[key] = deepClone((source as any)[key], hash)
    })
    // Clone Symbol key properties
    Object.getOwnPropertySymbols(source as object).forEach((sym) => {
      cloneObject[sym] = deepClone((source as any)[sym], hash)
    })
  }

  return cloneObject as T
}
