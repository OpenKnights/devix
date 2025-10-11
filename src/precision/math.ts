/**
 * Get absolute value
 * @param num - Number
 * @returns Absolute value
 * @example
 * abs(-3.7) // 3.7
 */
export function abs(num: number): number {
  return Math.abs(num)
}

/**
 * Calculate power (base^exponent)
 * @param base - Base number
 * @param exponent - Exponent
 * @returns Result
 * @example
 * pow(2, 3) // 8
 */
export function pow(base: number, exponent: number): number {
  return base ** exponent
}

/**
 * Calculate square root
 * @param num - Number
 * @returns Square root
 * @example
 * sqrt(9) // 3
 */
export function sqrt(num: number): number {
  return Math.sqrt(num)
}

/**
 * Get maximum value from multiple numbers
 * @param nums - Numbers to compare
 * @returns Maximum value
 * @example
 * max(0.1, 0.5, 0.3) // 0.5
 */
export function max(...nums: number[]): number {
  return Math.max(...nums)
}

/**
 * Get minimum value from multiple numbers
 * @param nums - Numbers to compare
 * @returns Minimum value
 * @example
 * min(0.1, 0.5, 0.3) // 0.1
 */
export function min(...nums: number[]): number {
  return Math.min(...nums)
}

/**
 * Clamp a number within a range
 * @param num - Number to clamp
 * @param min - Minimum value
 * @param max - Maximum value
 * @returns Clamped value
 * @example
 * clamp(5, 1, 3) // 3
 * clamp(0, 1, 3) // 1
 */
export function clamp(num: number, min: number, max: number): number {
  return Math.min(Math.max(num, min), max)
}
