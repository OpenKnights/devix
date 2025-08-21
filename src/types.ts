export type CaseType = 'upper' | 'lower'
export type CaseTypeTuple = [CaseType, CaseType]

export type DeepCloneFn = (source: any, hash?: WeakMap<object, any>) => any

export type FormatTimerFn = (
  cellValue: string | number | Date,
  formatType?: string
) => string | TimerFormatObj

export interface TimerFormatObj {
  year: string
  month: string
  day: string
  hours: string
  minutes: string
  seconds: string
  week: string
  weekNum: string
}

export interface ThrottleOptions {
  leading?: boolean
  trailing?: boolean
}
