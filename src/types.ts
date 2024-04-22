//! format types
export interface ITimerObj {
  year: string
  month: string
  day: string
  hours: string
  minutes: string
  seconds: string
  week: string
  weekNum: string
}

export type TFormatTimer = (
  cellValue: string | number | Date,
  formatType?: string
) => string | ITimerObj

//! retalimit types
export type ThrottleOptions = {
  leading?: boolean
  trailing?: boolean
}

//! other types
export type Tcase = 'upper' | 'lower'
export type TCases = [Tcase, Tcase]
