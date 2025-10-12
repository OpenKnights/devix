import { createBrowserStorageAdapter } from './adapter'
import { DevixStorage } from './storage'

/**
 * Create storage instance using localStorage (browser environment)
 */
export const createLocalStorage = (): DevixStorage => {
  return new DevixStorage(createBrowserStorageAdapter('localStorage'))
}

/**
 * Create storage instance using sessionStorage (browser environment)
 */
export const createSessionStorage = (): DevixStorage => {
  return new DevixStorage(createBrowserStorageAdapter('sessionStorage'))
}

export { DevixStorage }
