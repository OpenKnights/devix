import { getDecimalLength, toInteger } from './util'

/**
 * Add multiple numbers with precision
 * @param nums - Numbers to add
 * @returns Sum of all numbers
 * @example
 * add(0.1, 0.2) // 0.3
 * add(0.1, 0.2, 0.3) // 0.6
 */
export function add(...nums: number[]): number {
  if (nums.length === 0) return 0

  const maxLen = Math.max(...nums.map((n) => getDecimalLength(n)))
  const multiplier = 10 ** maxLen

  const sum = nums.reduce((acc, num) => {
    return acc + Math.round(num * multiplier)
  }, 0)

  return sum / multiplier
}

/**
 * Subtract two numbers with precision
 * @param a - Minuend
 * @param b - Subtrahend
 * @returns Difference
 * @example
 * subtract(0.3, 0.1) // 0.2
 */
export function subtract(a: number, b: number): number {
  const maxLen = Math.max(getDecimalLength(a), getDecimalLength(b))
  const multiplier = 10 ** maxLen

  return (Math.round(a * multiplier) - Math.round(b * multiplier)) / multiplier
}

/**
 * Multiply multiple numbers with precision
 * @param nums - Numbers to multiply
 * @returns Product of all numbers
 * @example
 * multiply(0.1, 0.2) // 0.02
 * multiply(0.1, 0.2, 2) // 0.04
 */
export function multiply(...nums: number[]): number {
  if (nums.length === 0) return 0

  return nums.reduce((acc, num) => {
    const a = toInteger(acc)
    const b = toInteger(num)
    const totalMultiplier = a.multiplier * b.multiplier

    return (a.int * b.int) / totalMultiplier
  })
}

/**
 * Divide two numbers with precision
 * @param a - Dividend
 * @param b - Divisor
 * @returns Quotient
 * @throws {Error} If divisor is zero
 * @example
 * divide(0.3, 0.1) // 3
 */
export function divide(a: number, b: number): number {
  if (b === 0) throw new Error('Division by zero')

  const aInfo = toInteger(a)
  const bInfo = toInteger(b)

  return (aInfo.int / bInfo.int) * (bInfo.multiplier / aInfo.multiplier)
}

/**
 * Modulo operation
 * @param a - Dividend
 * @param b - Divisor
 * @returns Remainder
 * @example
 * mod(7, 3) // 1
 */
export function mod(a: number, b: number): number {
  const maxLen = Math.max(getDecimalLength(a), getDecimalLength(b))
  const multiplier = 10 ** maxLen

  return (Math.round(a * multiplier) % Math.round(b * multiplier)) / multiplier
}
