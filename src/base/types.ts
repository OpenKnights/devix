/* array */
export type SortType = 'ASC' | 'DESC'

/* string */
export type CaseType = 'upper' | 'lower'
export type CaseTypeTuple = [CaseType, CaseType]

/* typed */
export type CommonType =
  | 'string'
  | 'number'
  | 'boolean'
  | 'array'
  | 'object'
  | 'function'
  | 'null'
  | 'undefined'
  | 'date'
  | 'regexp'
  | 'map'
  | 'set'
  | 'weakmap'
  | 'weakset'
  | 'promise'
  | 'error'
  | 'symbol'
  | 'bigint'

/* date */
export interface DateFormatValues {
  year: string
  month: string
  day: string
  hours: string
  minutes: string
  seconds: string
  week: string
  weekNum: number
}

/* timer */
export interface TimerControl {
  cancel: () => void
}
