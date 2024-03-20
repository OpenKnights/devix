import { isType } from './typeof'

enum CacheType {
  Local,
  Session
}

/**
 *  Encapsulate storage cache class
 *
 * @class StorageCache
 * @template T
 */
class StorageCache<T = any> {
  private storage: Storage

  constructor(type: CacheType) {
    this.storage = type === CacheType.Local ? localStorage : sessionStorage
  }

  getCache(key: string): T {
    const value: any = this.storage.getItem(key)
    return value ? JSON.parse(value) : null
  }

  setCache(key: string, value: T): void {
    this.storage.setItem(key, JSON.stringify(value))
  }

  updateCache(key: string, property: string, value: T) {
    const cache: any = this.getCache(key)
    if (isType('object', cache)) {
      cache[property] = value
      this.setCache(key, cache)
    }
  }

  deleteCache(key: string): void {
    this.storage.removeItem(key)
  }

  clearCache(): void {
    this.storage.clear()
  }
}

export const localCache = new StorageCache(CacheType.Local)
export const sessionCache = new StorageCache(CacheType.Session)
