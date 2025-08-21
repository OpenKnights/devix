export default function getDataType(target: any) {
  const type = typeof target
  return type !== 'object'
    ? type
    : Object.prototype.toString.call(target).slice(8, -1).toLowerCase()
}

const typeCheckRules = {
  // Basic type
  undefined: (target: unknown) => typeof target === 'undefined',
  null: (target: unknown) => target === null,
  number: (target: unknown) => typeof target === 'number',
  string: (target: unknown) => typeof target === 'string',
  boolean: (target: unknown) => typeof target === 'boolean',
  symbol: (target: unknown) => typeof target === 'symbol',
  bigint: (target: unknown) => typeof target === 'bigint',

  // Citation type
  object: (target: unknown) => target !== null && typeof target === 'object',
  array: (target: unknown) => Array.isArray(target),
  function: (target: unknown) => typeof target === 'function',
  date: (target: unknown) => target instanceof Date,
  set: (target: unknown) => target instanceof Set,
  map: (target: unknown) => target instanceof Map,
  regexp: (target: unknown) => target instanceof RegExp,
  promise: (target: unknown) => target instanceof Promise,

  // Expand type
  empty(target: unknown) {
    return this.string(target) && target === ''
  }
  // !(target !== null && target !== "" && typeof target !== "undefined"),
}

type TypeCheckOption = keyof typeof typeCheckRules

export const isType = (type: TypeCheckOption, target: unknown): boolean => {
  const dataType = typeCheckRules[type]
    ? typeCheckRules[type](target)
    : getDataType(target) === type
  return dataType
}
