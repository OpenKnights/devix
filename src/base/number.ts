export const toFloat = <T extends number | null = number>(
  value: any,
  defaultValue?: T
): number | T => {
  const def = defaultValue === undefined ? 0.0 : defaultValue
  if (value === null || value === undefined) {
    return def
  }
  const result = Number.parseFloat(value)
  return Number.isNaN(result) ? def : result
}

export const toInt = <T extends number | null = number>(
  value: any,
  defaultValue?: T
): number | T => {
  const def = defaultValue === undefined ? 0 : defaultValue
  if (value === null || value === undefined) {
    return def
  }
  const result = Number.parseInt(value)
  return Number.isNaN(result) ? def : result
}

/**
 * Fill the number to two digits
 */
export function padNumber(value: number): string {
  return value.toString().padStart(2, '0')
}
