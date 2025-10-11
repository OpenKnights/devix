import { subtract } from './arithmetic'

/**
 * Check if two numbers are equal (considering precision)
 * @param a - First number
 * @param b - Second number
 * @param epsilon - Precision threshold
 * @returns True if equal within epsilon
 * @example
 * equals(0.1 + 0.2, 0.3) // true
 */
export function equals(a: number, b: number, epsilon: number = 1e-10): boolean {
  return Math.abs(a - b) < epsilon
}

/**
 * Check if a > b
 * @param a - First number
 * @param b - Second number
 * @returns True if a > b
 * @example
 * gt(1.5, 1.2) // true
 */
export function gt(a: number, b: number): boolean {
  return subtract(a, b) > 0
}

/**
 * Check if a >= b
 * @param a - First number
 * @param b - Second number
 * @returns True if a >= b
 * @example
 * gte(1.2, 1.2) // true
 */
export function gte(a: number, b: number): boolean {
  return subtract(a, b) >= 0
}

/**
 * Check if a < b
 * @param a - First number
 * @param b - Second number
 * @returns True if a < b
 * @example
 * lt(1.2, 1.5) // true
 */
export function lt(a: number, b: number): boolean {
  return subtract(a, b) < 0
}

/**
 * Check if a <= b
 * @param a - First number
 * @param b - Second number
 * @returns True if a <= b
 * @example
 * lte(1.2, 1.2) // true
 */
export function lte(a: number, b: number): boolean {
  return subtract(a, b) <= 0
}
