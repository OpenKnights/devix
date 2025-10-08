export const isObject = (target: unknown) =>
  target !== null && typeof target === 'object'

export const isString = (target: unknown) => typeof target === 'string'

export const isJsonString = (target: unknown) => {
  try {
    if (isString(target) && typeof JSON.parse(target) === 'object') {
      return true
    }
    // eslint-disable-next-line unused-imports/no-unused-vars
  } catch (_error) {
    return false
  }

  return false
}

export enum CacheType {
  Local,
  Session
}
