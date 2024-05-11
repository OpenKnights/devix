import { ITypeCheckes, TIsType } from '../types'

export default function getDataType(target: any) {
  const type = typeof target
  return type !== 'object'
    ? type
    : Object.prototype.toString.call(target).slice(8, -1).toLowerCase()
}

const typeCheckers: ITypeCheckes = {
  // DataType
  undefined: (target) => typeof target === 'undefined',
  null: (target) => target === null,
  number: (target) => typeof target === 'number',
  string: (target) => typeof target === 'string',
  boolean: (target) => typeof target === 'boolean',
  symbol: (target) => typeof target === 'symbol',
  bigint: (target) => typeof target === 'bigint',

  // ObjectType
  object: (target) => target !== null && typeof target === 'object',
  array: (target) => Array.isArray(target),
  date: (target) => target instanceof Date,
  function: (target) => typeof target === 'function',
  set: (target) => target instanceof Set,
  map: (target) => target instanceof Map,
  regexp: (target) => target instanceof RegExp,
  promise: (target) => target instanceof Promise,

  // ExpandType
  empty: (target) =>
    !(target !== null && target !== '' && typeof target !== 'undefined')
}

export const isType: TIsType = (type: string, target: any) => {
  const dataType = typeCheckers[type]
    ? typeCheckers[type](target)
    : getDataType(target) === type
  return dataType
}
