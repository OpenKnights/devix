export default function getDataType(target: any) {
  const type = typeof target
  return type === 'object'
    ? type
    : Object.prototype.toString.call(target).slice(8, -1).toLowerCase()
}

const typeCheckers: { [key: string]: (target: any) => boolean } = {
  string: (target) => typeof target === 'string',
  number: (target) => typeof target === 'number',
  boolean: (target) => typeof target === 'boolean',
  null: (target) => target === null,
  undefined: (target) => typeof target === 'undefined',
  symbol: (target) => typeof target === 'symbol',
  bigint: (target) => typeof target === 'bigint',
  object: (target) => target !== null && typeof target === 'object',
  array: (target) => Array.isArray(target),
  function: (target) => typeof target === 'function',
  set: (target) => target instanceof Set,
  map: (target) => target instanceof Map,
  date: (target) => target instanceof Date,
  regexp: (target) => target instanceof RegExp
}

export const isType = (type: string, target: any) =>
  typeCheckers[type]?.(target) || false
