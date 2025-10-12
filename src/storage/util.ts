export const isObject = (value: unknown): value is Record<string, any> => {
  return !!value && value.constructor === Object
}

export const isString = (value: unknown): value is string => {
  // eslint-disable-next-line unicorn/no-instanceof-builtins
  return typeof value === 'string' || value instanceof String
}

export const isJsonString = (value: unknown): boolean => {
  if (!isString(value)) return false

  try {
    const parsed = JSON.parse(value)
    return isObject(parsed) || Array.isArray(parsed)
  } catch {
    return false
  }
}

/**
 * Check if a string is a valid array index
 */
export const isArrayIndex = (value: string): boolean => {
  return /^\d+$/.test(value)
}

/**
 * Parse path string into path segments array
 * Example: 'info.name' => ['info', 'name']
 *          '0.info.name' => ['0', 'info', 'name']
 */
export const parsePath = (path: string): string[] => {
  return path.split('.').filter((segment) => segment.trim() !== '')
}
