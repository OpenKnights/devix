/* eslint-disable no-restricted-syntax */
/* eslint-disable no-continue */
import { Tcase, TCases, TTransGetParams } from '../types'
import { isType } from './typeof'

export function currying(fn: (...args: any[]) => any) {
  function curried(this: any, ...args: any[]) {
    if (args.length >= fn.length) return fn.apply(this, args)

    return function subCurried(this: any, ...args2: any[]) {
      return curried.apply(this, args.concat(args2))
    }
  }
  return curried
}

export function compose(...fns: ((...args: any[]) => any)[]) {
  const { length } = fns
  if (length <= 0) return null
  for (let i = 0; i < length; i++) {
    const fn = fns[i]
    if (typeof fn !== 'function') {
      throw new Error(`argument with index ${i} is not a function`)
    }
  }
  function executeFn(this: any, ...args: any[]) {
    let index = 0
    let result = fns[index].apply(this, args)
    while (++index < length) {
      result = fns[index].call(this, result)
    }
    return result
  }

  return executeFn
}

export function insertStr(soure: string, start: number, newStr: string) {
  return soure.slice(0, start) + newStr + soure.slice(start)
}

function setCaseType(soure: string, caseType: Tcase) {
  const newStr =
    soure.slice(0, 1)[caseType === 'upper' ? 'toUpperCase' : 'toLowerCase']() +
    soure.slice(1).toLowerCase()
  return newStr
}

export function stringCase(
  soure: string,
  separa: string[] = ['', ''],
  cases: TCases = ['upper', 'upper']
) {
  const [separator, separate] = separa
  const [firstCase, argsCase] = cases
  const newStr = soure.split(separator)

  for (let i = 0; i < newStr.length; i++) {
    newStr[i] = setCaseType(newStr[i], i === 0 ? firstCase : argsCase)
  }

  return newStr.join(separate)
}

// Transform Parameters
export const transformGetParams: TTransGetParams = (params) => {
  let result = ''

  for (const propName of Object.keys(params)) {
    const value = params[propName]
    const part = `${encodeURIComponent(propName)}=`
    if (isType('empty', value)) continue

    if (!isType('object', value)) {
      result += `${part + encodeURIComponent(value)}&`
      continue
    }

    for (const key of Object.keys(value)) {
      if (!isType('empty', value)) continue

      const paramsStr = `${propName}[${key}]`
      const subPart = `${encodeURIComponent(paramsStr)}=`

      result += `${subPart + encodeURIComponent(value[key])}&`
    }
  }
  return result.slice(0, -1)
}
