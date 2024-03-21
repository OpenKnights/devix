export function currying(fn: Function) {
  function curried(this: any, ...args: any[]) {
    if (args.length >= fn.length) {
      return fn.apply(this, args)
    } else {
      return function (this: any, ...args2: any[]) {
        return curried.apply(this, args.concat(args2))
      }
    }
  }
  return curried
}

export function compose(...fns: Function[]) {
  const length = fns.length
  if (length <= 0) return
  for (let i = 0; i < length; i++) {
    const fn = fns[i]
    if (typeof fn !== 'function') {
      throw new Error(`argument with index ${i} is not a function`)
    }
  }

  return function (this: any, ...args: any[]) {
    let index = 0
    let result = fns[index].apply(this, args)
    while (++index < length) {
      result = fns[index].call(this, result)
    }
    return result
  }
}

export function insertStr(soure: string, start: number, newStr: string) {
  return soure.slice(0, start) + newStr + soure.slice(start)
}

export function stringCase(soure: string, separator = '', separate = '') {
  const newStr = soure.split(separator)
  for (let i = 0; i < newStr.length; i++) {
    newStr[i] =
      newStr[i].slice(0, 1).toUpperCase() + newStr[i].slice(1).toLowerCase()
  }
  return newStr.join(separate)
}

export function setTimer(
  execute: (...args: any[]) => any,
  delay: number = 0,
  immediate: boolean = false
) {
  let timer: ReturnType<typeof setTimeout> | null = null

  const interval = () => {
    execute()
    timer = setTimeout(interval, delay)
  }

  if (immediate) execute()

  setTimeout(interval, delay)

  return {
    cancel: () => {
      if (timer !== null) clearTimeout(timer)
    }
  }
}
