import type { IntegerInfo } from './types'

/**
 * Get the number of decimal places in a number
 * @param num - The number to check
 * @returns Number of decimal places
 */
export function getDecimalLength(num: number): number {
  const str = num.toString()
  const decimal = str.split('.')[1]
  return decimal ? decimal.length : 0
}

/**
 * Convert a floating-point number to an integer (multiply by 10^n)
 * @param num - The number to convert
 * @returns Integer representation and multiplier
 */
export function toInteger(num: number): IntegerInfo {
  const len = getDecimalLength(num)
  const multiplier = 10 ** len
  return {
    int: Math.round(num * multiplier),
    multiplier
  }
}
