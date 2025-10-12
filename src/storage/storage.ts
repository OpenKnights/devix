import type { GetOptions, SetOptions, StorageAdapter } from './types'
import {
  isArrayIndex,
  isJsonString,
  isObject,
  isString,
  parsePath
} from './util'

export class DevixStorage {
  private adapter: StorageAdapter

  constructor(adapter: StorageAdapter) {
    this.adapter = adapter
  }

  /**
   * Get stored value with automatic JSON deserialization
   */
  get<T = any>(key: string, options?: GetOptions<T>): T | null {
    try {
      const rawValue = this.adapter.getItem(key)

      if (rawValue === null) {
        return options?.defaultValue ?? null
      }

      // Attempt to parse JSON
      if (isJsonString(rawValue)) {
        return JSON.parse(rawValue) as T
      }

      return rawValue as T
    } catch (error) {
      console.error(`DevixStorage.get error for key "${key}":`, error)
      return options?.defaultValue ?? null
    }
  }

  /**
   * Set storage value with automatic object serialization
   * Supports deep path modification and array indices
   */
  set(key: string, value: any, options?: SetOptions): void {
    try {
      // Handle property update scenario
      if (this._shouldUpdateProperty(key, options)) {
        this._updateByPath(key, value, options!)
        return
      }

      // Serialize and store
      const serialized = this._serialize(value)
      this.adapter.setItem(key, serialized)
    } catch (error) {
      console.error(`DevixStorage.set error for key "${key}":`, error)
    }
  }

  /**
   * Remove specified key
   */
  remove(key: string): void {
    try {
      this.adapter.removeItem(key)
    } catch (error) {
      console.error(`DevixStorage.remove error for key "${key}":`, error)
    }
  }

  /**
   * Check if key exists
   */
  has(key: string): boolean {
    try {
      return this.adapter.getItem(key) !== null
    } catch (error) {
      console.error(`DevixStorage.has error for key "${key}":`, error)
      return false
    }
  }

  /**
   * Clear all storage
   */
  clear(): void {
    try {
      this.adapter.clear()
    } catch (error) {
      console.error('DevixStorage.clear error:', error)
    }
  }

  // ==================== Private Methods ====================

  /**
   * Check if should update object property
   */
  private _shouldUpdateProperty(key: string, options?: SetOptions): boolean {
    if (!options?.property) return false

    const property = options.property.trim()
    if (!property) return false

    return this.has(key)
  }

  /**
   * Update value by path (supports deep paths and array indices)
   */
  private _updateByPath(key: string, value: any, options: SetOptions): void {
    const existingValue = this.get(key)
    const pathSegments = parsePath(options.property!)

    if (pathSegments.length === 0) {
      console.warn(`Invalid property path: "${options.property}"`)
      return
    }

    // Single-level path, use original logic (backward compatible)
    if (pathSegments.length === 1) {
      this._updateSingleProperty(key, existingValue, value, pathSegments[0])
      return
    }

    // Deep path
    const result = this._setDeepValue(
      existingValue,
      pathSegments,
      value,
      options.createPath ?? false
    )

    if (result.success) {
      const serialized = JSON.stringify(existingValue)
      this.adapter.setItem(key, serialized)
    }
  }

  /**
   * Update single property (original logic)
   */
  private _updateSingleProperty(
    key: string,
    target: any,
    value: any,
    property: string
  ): void {
    // Handle array index
    if (Array.isArray(target) && isArrayIndex(property)) {
      const index = Number.parseInt(property, 10)
      if (index >= 0 && index < target.length) {
        target[index] = value
        const serialized = JSON.stringify(target)
        this.adapter.setItem(key, serialized)
      } else {
        console.warn(
          `Array index ${index} out of bounds for key "${key}" (length: ${target.length})`
        )
      }
      return
    }

    // Handle object property
    if (!isObject(target)) {
      console.warn(
        `Cannot update property "${property}" on non-object value for key "${key}"`
      )
      return
    }

    target[property] = value
    const serialized = JSON.stringify(target)
    this.adapter.setItem(key, serialized)
  }

  /**
   * Set deep path value
   */
  private _setDeepValue(
    obj: any,
    pathSegments: string[],
    value: any,
    createPath: boolean
  ): { success: boolean; message?: string } {
    let current = obj

    // Traverse to second-to-last level
    for (let i = 0; i < pathSegments.length - 1; i++) {
      const segment = pathSegments[i]
      const nextSegment = pathSegments[i + 1]
      const isCurrentArrayIndex = isArrayIndex(segment)
      const isNextArrayIndex = isArrayIndex(nextSegment)

      // Handle current level
      if (isCurrentArrayIndex) {
        // Current is array index
        if (!Array.isArray(current)) {
          console.warn(
            `Expected array at path "${pathSegments.slice(0, i + 1).join('.')}", got ${typeof current}`
          )
          return { success: false, message: 'Type mismatch: expected array' }
        }

        const index = Number.parseInt(segment, 10)
        if (index < 0 || index >= current.length) {
          console.warn(
            `Array index ${index} out of bounds at path "${pathSegments.slice(0, i + 1).join('.')}"`
          )
          return { success: false, message: 'Array index out of bounds' }
        }

        // Check if next level exists
        if (current[index] === undefined || current[index] === null) {
          if (createPath) {
            // Create object or array based on next segment
            current[index] = isNextArrayIndex ? [] : {}
          } else {
            console.warn(
              `Path does not exist: "${pathSegments.slice(0, i + 2).join('.')}". Use createPath: true to auto-create.`
            )
            return { success: false, message: 'Path does not exist' }
          }
        }

        current = current[index]
      } else {
        // Current is object property
        if (!isObject(current)) {
          console.warn(
            `Expected object at path "${pathSegments.slice(0, i + 1).join('.')}", got ${typeof current}`
          )
          return { success: false, message: 'Type mismatch: expected object' }
        }

        // Check if property exists
        if (!(segment in current)) {
          if (createPath) {
            // Create object or array based on next segment
            current[segment] = isNextArrayIndex ? [] : {}
          } else {
            console.warn(
              `Property "${segment}" does not exist at path "${pathSegments.slice(0, i + 1).join('.')}". Use createPath: true to auto-create.`
            )
            return { success: false, message: 'Property does not exist' }
          }
        }

        current = current[segment]
      }
    }

    // Set last level value
    const lastSegment = pathSegments[pathSegments.length - 1]

    if (isArrayIndex(lastSegment)) {
      // Last level is array index
      if (!Array.isArray(current)) {
        console.warn(
          `Expected array at path "${pathSegments.slice(0, -1).join('.')}", got ${typeof current}`
        )
        return { success: false, message: 'Type mismatch: expected array' }
      }

      const index = Number.parseInt(lastSegment, 10)
      if (index < 0 || index >= current.length) {
        console.warn(
          `Array index ${index} out of bounds at path "${pathSegments.join('.')}"`
        )
        return { success: false, message: 'Array index out of bounds' }
      }

      current[index] = value
    } else {
      // Last level is object property
      if (!isObject(current)) {
        console.warn(
          `Expected object at path "${pathSegments.slice(0, -1).join('.')}", got ${typeof current}`
        )
        return { success: false, message: 'Type mismatch: expected object' }
      }

      current[lastSegment] = value
    }

    return { success: true }
  }

  /**
   * Serialize value
   */
  private _serialize(value: any): string {
    if (isString(value)) {
      return value
    }

    if (isObject(value) || Array.isArray(value)) {
      return JSON.stringify(value)
    }

    // Handle other primitive types
    return String(value)
  }
}
