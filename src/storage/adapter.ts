import type { BrowserStorageType, StorageAdapter } from './types'

export const createBrowserStorageAdapter = (
  type: BrowserStorageType
): StorageAdapter => {
  if (typeof window === 'undefined' || !window[type]) {
    throw new Error(`${type} is not available in this environment`)
  }

  const storage = window[type]

  return {
    getItem: (key: string) => storage.getItem(key),
    setItem: (key: string, value: string) => storage.setItem(key, value),
    removeItem: (key: string) => storage.removeItem(key),
    clear: () => storage.clear()
  }
}

export const createNodeStorageAdapter = (
  type: BrowserStorageType
): StorageAdapter => {
  if (typeof window === 'undefined' || !window[type]) {
    throw new Error(`${type} is not available in this environment`)
  }

  const storage = window[type]

  return {
    getItem: (key: string) => storage.getItem(key),
    setItem: (key: string, value: string) => storage.setItem(key, value),
    removeItem: (key: string) => storage.removeItem(key),
    clear: () => storage.clear()
  }
}
