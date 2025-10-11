/**
 * Round a number to specified decimal places
 * @param num - Number to round
 * @param decimals - Number of decimal places
 * @returns Rounded number
 * @example
 * round(1.2345, 2) // 1.23
 */
export function round(num: number, decimals: number = 2): number {
  const multiplier = 10 ** decimals
  return Math.round(num * multiplier) / multiplier
}

/**
 * Round up a number to specified decimal places
 * @param num - Number to round up
 * @param decimals - Number of decimal places
 * @returns Rounded up number
 * @example
 * ceil(1.2345, 2) // 1.24
 */
export function ceil(num: number, decimals: number = 2): number {
  const multiplier = 10 ** decimals
  return Math.ceil(num * multiplier) / multiplier
}

/**
 * Round down a number to specified decimal places
 * @param num - Number to round down
 * @param decimals - Number of decimal places
 * @returns Rounded down number
 * @example
 * floor(1.2345, 2) // 1.23
 */
export function floor(num: number, decimals: number = 2): number {
  const multiplier = 10 ** decimals
  return Math.floor(num * multiplier) / multiplier
}

/**
 * Format a number to fixed decimal places (returns string, like native toFixed)
 * @param num - Number to format
 * @param decimals - Number of decimal places
 * @returns Formatted string
 * @example
 * toFixed(1.2, 2) // "1.20"
 */
export function toFixed(num: number, decimals: number = 2): string {
  const rounded = round(num, decimals)
  return rounded.toFixed(decimals)
}
