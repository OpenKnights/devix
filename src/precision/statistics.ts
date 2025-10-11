import { add, divide, multiply } from './arithmetic'
import { round } from './rounding'

/**
 * Sum multiple numbers (alias for add)
 * @param nums - Numbers to sum
 * @returns Sum
 * @example
 * Precision.sum(0.1, 0.2, 0.3) // 0.6
 */
export function sum(...nums: number[]): number {
  return add(...nums)
}

/**
 * Calculate average of multiple numbers
 * @param nums - Numbers
 * @returns Average value
 * @example
 * Precision.average(0.1, 0.2, 0.3) // 0.2
 */
export function average(...nums: number[]): number {
  if (nums.length === 0) return 0
  const total = sum(...nums)
  return divide(total, nums.length)
}

/**
 * Calculate percentage (num / total * 100)
 * @param num - Numerator
 * @param total - Denominator
 * @param decimals - Decimal places for result
 * @returns Percentage value
 * @example
 * Precision.percent(25, 100) // 25
 * Precision.percent(33, 99, 2) // 33.33
 */
export function percent(
  num: number,
  total: number,
  decimals: number = 2
): number {
  if (total === 0) return 0
  const result = divide(num, total)
  return round(multiply(result, 100), decimals)
}
