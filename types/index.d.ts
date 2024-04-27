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

//! test types
export interface ITestServer extends Koa {
  http?: any
  callback: () => any
  close?: () => void
  port?: number
  url?: string
  listen: () => Promise<any> | any
  use?: any
}

interface TestServerOption {
  url: string
  method: string
  handler: (ctx: any, next: any) => any
}

export interface ITestServerOptions {
  routes?: Array<TestServerOption>
}

//! typeof Types
// utils types
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
