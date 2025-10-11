import type { TimerControl } from './types'

import { iterate } from './array'

/* Timer */
/**
 * Creates a serial interval executor
 *
 * Difference from setInterval:
 * - setInterval: Triggers every X milliseconds (regardless of whether the previous execution is complete)
 * - setSerialInterval: Waits for the previous execution to complete, then waits X milliseconds before executing the next one
 *
 */
export async function setSerialInterval(
  execute: (...args: any[]) => any,
  delay: number = 0,
  immediate: boolean = false
): Promise<TimerControl> {
  let timerId: ReturnType<typeof setTimeout> | null = null
  let isCancelled = false

  const scheduleNext = async () => {
    // If already cancelled, do not schedule next execution
    if (isCancelled) return

    try {
      await execute()
    } catch (error) {
      // You can choose to handle errors here, or let them continue to throw
      console.error('Timer execution error:', error)
    }

    // After execution, if not cancelled, schedule the next execution
    if (!isCancelled) {
      timerId = setTimeout(scheduleNext, delay)
    }
  }

  // Execute immediately if needed
  if (immediate) {
    await execute()
  }

  // Schedule the first execution (if immediate is true, this is the second execution)
  if (!isCancelled) {
    timerId = setTimeout(scheduleNext, delay)
  }

  return {
    cancel: () => {
      isCancelled = true
      if (timerId !== null) {
        clearTimeout(timerId)
        timerId = null
      }
    }
  }
}

/* Random */
/**
 * Generates a random number between min and max
 */
export const random = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export const uid = (length: number, specials: string = '') => {
  const characters = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789${specials}`
  return iterate(
    length,
    (acc) => {
      return acc + characters.charAt(random(0, characters.length - 1))
    },
    ''
  )
}

/* Url */
/**
 * Transforms an object into URL query string parameters
 *
 * Supports nested objects with bracket notation (e.g., filter[name]=value)
 * Automatically encodes keys and values for URL safety
 * Skips null, undefined, and empty string values
 *
 * @param params - The parameters object to transform
 * @returns URL-encoded query string (without leading '?')
 *
 * @example
 * // Simple parameters
 * toQueryString({ name: 'John', age: 25 })
 * // Result: 'name=John&age=25'
 *
 * @example
 * // Nested object parameters
 * toQueryString({ filter: { status: 'active', type: 'user' }, page: 1 })
 * // Result: 'filter[status]=active&filter[type]=user&page=1'
 *
 * @example
 * // Skips empty values
 * toQueryString({ name: 'John', email: null, phone: '' })
 * // Result: 'name=John'
 */
export function toQueryString(params: Record<string, any>): string {
  const pairs: string[] = []

  for (const [key, value] of Object.entries(params)) {
    // Skip null, undefined, and empty strings
    if (value == null || value === '') continue

    // Handle nested objects
    if (typeof value === 'object' && !Array.isArray(value)) {
      for (const [nestedKey, nestedValue] of Object.entries(value)) {
        // Skip empty nested values
        if (nestedValue == null || nestedValue === '') continue

        const encodedKey = encodeURIComponent(`${key}[${nestedKey}]`)
        const encodedValue = encodeURIComponent(String(nestedValue))
        pairs.push(`${encodedKey}=${encodedValue}`)
      }
    } else {
      // Handle primitive values and arrays
      const encodedKey = encodeURIComponent(key)
      const encodedValue = encodeURIComponent(String(value))
      pairs.push(`${encodedKey}=${encodedValue}`)
    }
  }

  return pairs.join('&')
}
