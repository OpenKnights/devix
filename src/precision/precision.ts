import { add, divide, mod, multiply, subtract } from './arithmetic'
import { equals, gt, gte, lt, lte } from './comparison'
import { abs, clamp, pow, sqrt } from './math'
import { ceil, floor, round, toFixed } from './rounding'

/**
 * Chainable precision calculation class
 * @class Precision
 */
class Precision {
  private value: number

  /**
   * Create a new Precision instance
   * @param value - Initial value
   */
  constructor(value: number) {
    this.value = value
  }

  /**
   * Add numbers to the current value
   * @param nums - Numbers to add
   * @returns This instance for chaining
   */
  add(...nums: number[]): Precision {
    this.value = add(this.value, ...nums)
    return this
  }

  /**
   * Subtract a number from the current value
   * @param num - Number to subtract
   * @returns This instance for chaining
   */
  subtract(num: number): Precision {
    this.value = subtract(this.value, num)
    return this
  }

  /**
   * Multiply the current value by numbers
   * @param nums - Numbers to multiply
   * @returns This instance for chaining
   */
  multiply(...nums: number[]): Precision {
    this.value = multiply(this.value, ...nums)
    return this
  }

  /**
   * Divide the current value by a number
   * @param num - Divisor
   * @returns This instance for chaining
   */
  divide(num: number): Precision {
    this.value = divide(this.value, num)
    return this
  }

  /**
   * Round the current value
   * @param decimals - Decimal places
   * @returns This instance for chaining
   */
  round(decimals: number = 2): Precision {
    this.value = round(this.value, decimals)
    return this
  }

  /**
   * Round up the current value
   * @param decimals - Decimal places
   * @returns This instance for chaining
   */
  ceil(decimals: number = 2): Precision {
    this.value = ceil(this.value, decimals)
    return this
  }

  /**
   * Round down the current value
   * @param decimals - Decimal places
   * @returns This instance for chaining
   */
  floor(decimals: number = 2): Precision {
    this.value = floor(this.value, decimals)
    return this
  }

  /**
   * Format the current value to fixed decimal places
   * @param decimals - Decimal places
   * @returns Formatted string
   */
  toFixed(decimals: number = 2): string {
    return toFixed(this.value, decimals)
  }

  /**
   * Get absolute value of current value
   * @returns This instance for chaining
   */
  abs(): Precision {
    this.value = abs(this.value)
    return this
  }

  /**
   * Check if current value equals another number
   * @param num - Number to compare
   * @param epsilon - Precision threshold
   * @returns True if equal
   */
  equals(num: number, epsilon?: number): boolean {
    return equals(this.value, num, epsilon)
  }

  /**
   * Check if current value > num
   * @param num - Number to compare
   * @returns True if greater
   */
  gt(num: number): boolean {
    return gt(this.value, num)
  }

  /**
   * Check if current value >= num
   * @param num - Number to compare
   * @returns True if greater or equal
   */
  gte(num: number): boolean {
    return gte(this.value, num)
  }

  /**
   * Check if current value < num
   * @param num - Number to compare
   * @returns True if less
   */
  lt(num: number): boolean {
    return lt(this.value, num)
  }

  /**
   * Check if current value <= num
   * @param num - Number to compare
   * @returns True if less or equal
   */
  lte(num: number): boolean {
    return lte(this.value, num)
  }

  /**
   * Raise current value to a power
   * @param exponent - Exponent
   * @returns This instance for chaining
   */
  pow(exponent: number): Precision {
    this.value = pow(this.value, exponent)
    return this
  }

  /**
   * Get square root of current value
   * @returns This instance for chaining
   */
  sqrt(): Precision {
    this.value = sqrt(this.value)
    return this
  }

  /**
   * Modulo operation on current value
   * @param num - Divisor
   * @returns This instance for chaining
   */
  mod(num: number): Precision {
    this.value = mod(this.value, num)
    return this
  }

  /**
   * Clamp current value within a range
   * @param min - Minimum value
   * @param max - Maximum value
   * @returns This instance for chaining
   */
  clamp(min: number, max: number): Precision {
    this.value = clamp(this.value, min, max)
    return this
  }

  /**
   * Get the final calculated value
   * @returns Final value
   */
  get(): number {
    return this.value
  }
}

/**
 * Factory function to create a chainable precision calculator
 * @param value - Initial value
 * @returns Chainable instance
 * @example
 * precision(0.1).add(0.2).multiply(2).get() // 0.6
 */
function precision(value: number): Precision {
  return new Precision(value)
}

// Export for module usage
export { precision, Precision }
