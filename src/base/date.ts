import type { DateFormatValues } from './types'
import { padNumber } from './number'
import { isString } from './typed'

// Formatting rule mapping
const FORMAT_PATTERNS = new Map<string, keyof DateFormatValues>([
  ['yyyy', 'year'],
  ['MM', 'month'],
  ['dd', 'day'],
  ['HH', 'hours'],
  ['mm', 'minutes'],
  ['ss', 'seconds'],
  ['W', 'week']
])

// Weekly Map
const WEEK_NAMES = new Map<number, string>([
  [0, '日'],
  [1, '一'],
  [2, '二'],
  [3, '三'],
  [4, '四'],
  [5, '五'],
  [6, '六']
])

/**
 * Create a date format value object
 */
function createDateValues(date: Date): DateFormatValues {
  const dayOfWeek = date.getDay()

  return {
    year: date.getFullYear().toString(),
    month: padNumber(date.getMonth() + 1),
    day: padNumber(date.getDate()),
    hours: padNumber(date.getHours()),
    minutes: padNumber(date.getMinutes()),
    seconds: padNumber(date.getSeconds()),
    week: WEEK_NAMES.get(dayOfWeek) || '',
    weekNum: dayOfWeek
  }
}

/**
 * Formatting Dates
 * @param date - The date to be formatted (can be a string, a numeric timestamp, or a Date object)
 * @param format - The formatting template, default is 'yyyy-MM-dd HH:mm:ss'
 *                 Passing an empty string returns the formatted value object
 * @returns Formatted string or formatted value object
 */
export function formatDate(
  date: string | number | Date,
  format: string | null = 'yyyy-MM-dd HH:mm:ss'
): string | DateFormatValues {
  if (!date) {
    return new Date().toISOString()
  }

  const dateObj = new Date(date || new Date())
  const dateValues = createDateValues(dateObj)

  if ((isString(format) && !format.trim()) || !format) {
    return dateValues
  }

  let formattedString = format
  FORMAT_PATTERNS.forEach((key, pattern) => {
    const value = dateValues[key]
    formattedString = formattedString.replace(
      new RegExp(pattern, 'g'),
      String(value)
    )
  })

  return formattedString
}
