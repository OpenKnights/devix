import { isType } from './typeof'
import { TFormatTimer, ITimerObj } from '../types'

const formatRules = new Map<string, keyof ITimerObj>([
  ['yyyy', 'year'],
  ['MM', 'month'],
  ['dd', 'day'],
  ['HH', 'hours'],
  ['mm', 'minutes'],
  ['ss', 'seconds'],
  ['W', 'week']
])

const WeekList = new Map<number, string>([
  [1, '一'],
  [2, '二'],
  [3, '三'],
  [4, '四'],
  [5, '五'],
  [6, '六'],
  [0, '日']
])

function processWeek(weekNum: number): string {
  return WeekList.get(weekNum) || ''
}

function formatNumber(value: number): string {
  return value.toString().padStart(2, '0')
}

function createTimerObj(date: Date): ITimerObj {
  const dayOfWeek = date.getDay() === 0 ? 7 : date.getDay()
  return {
    year: date.getFullYear().toString(),
    month: formatNumber(date.getMonth() + 1),
    day: formatNumber(date.getDate()),
    hours: formatNumber(date.getHours()),
    minutes: formatNumber(date.getMinutes()),
    seconds: formatNumber(date.getSeconds()),
    week: processWeek(dayOfWeek),
    weekNum: dayOfWeek.toString()
  }
}

export const formatTimer: TFormatTimer = (
  cellValue,
  formatType = 'yyyy-MM-dd HH:mm:ss'
) => {
  if (!cellValue) return new Date().toISOString()

  const date = new Date(cellValue)
  const timerObj = createTimerObj(date)

  if (isType('string', formatType) && !formatType.trim()) return timerObj

  const timerStr = Array.from(formatRules).reduce(
    (currentFormat, [rule, key]) => {
      return currentFormat.replace(new RegExp(rule, 'g'), timerObj[key])
    },
    formatType
  )

  return timerStr
}

export async function setTimer(
  execute: (...args: any[]) => any,
  delay: number = 0,
  immediate: boolean = false
) {
  let timer: ReturnType<typeof setTimeout> | null = null

  const interval = async () => {
    await execute()
    timer = setTimeout(interval, delay)
  }

  if (immediate) await execute()

  setTimeout(interval, delay)

  return {
    cancel: () => {
      if (timer !== null) clearTimeout(timer)
    }
  }
}
