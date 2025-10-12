export type BrowserStorageType = 'localStorage' | 'sessionStorage'

/**
 * Storage adapter interface, compatible with various storage implementations
 */
export interface StorageAdapter {
  getItem: (key: string) => string | null
  setItem: (key: string, value: string) => void
  removeItem: (key: string) => void
  clear: () => void
}

/**
 * Options for get method
 */
export interface GetOptions<T = any> {
  /**
   * Default value to return when key doesn't exist
   */
  defaultValue?: T
}

/**
 * Options for set method
 */
export interface SetOptions {
  /**
   * Property path to update when key contains object/array
   * Supports deep paths and array indices
   *
   * Examples:
   * - storage.set('user', 'Alice', { property: 'name' })
   * - storage.set('user', 'Bob', { property: 'info.name' })
   * - storage.set('users', 'Charlie', { property: '0.info.name' })
   */
  property?: string

  /**
   * When property is set and path doesn't exist, whether to auto-create intermediate objects
   * Defaults to false (don't create, only warn)
   */
  createPath?: boolean
}
