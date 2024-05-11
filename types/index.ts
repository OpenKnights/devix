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

//! typeof Types
export interface ITypeCheckes {
  [key: string]: (target: any) => boolean
}
export type TIsType = (type: string, target: any) => boolean

//! other types
export type Tcase = 'upper' | 'lower'
export type TCases = [Tcase, Tcase]
export type TTransGetParams = (params: IDataObject) => string
export interface IDataObject {
  [key: string]: any
}

//! clone types
export type TDeepClone = (source: any, hash?: WeakMap<object, any>) => any
