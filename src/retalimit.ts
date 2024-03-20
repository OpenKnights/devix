import { ThrottleOptions } from './types'

export function debounce<T extends (...args: any[]) => any>(
  callback: T,
  delay: number = 0,
  immediate: boolean = false
): ((...args: Parameters<T>) => Promise<ReturnType<T>>) & {
  cancel: () => void
} {
  let timer: ReturnType<typeof setTimeout> | null = null
  let isInvoke: boolean = false

  function _debounce(this: any, ...args: Parameters<T>) {
    return new Promise<ReturnType<T>>((resolve, reject) => {
      if (timer !== null) clearTimeout(timer)

      if (immediate && !isInvoke) {
        try {
          const result: ReturnType<T> = callback.apply(this, args)
          resolve(result)
        } catch (error) {
          reject(error)
        }
        isInvoke = true
        return
      }

      timer = setTimeout(() => {
        try {
          const result: ReturnType<T> = callback.apply(this, args)
          resolve(result)
        } catch (error) {
          reject(error)
        } finally {
          timer = null
          isInvoke = false
        }
      }, delay)
    })
  }

  _debounce.cancel = function (): void {
    if (timer !== null) clearTimeout(timer)
    timer = null
    isInvoke = false
  }

  return _debounce
}

export function throttle<T extends (...args: any[]) => any>(
  callback: T,
  interval: number,
  options: ThrottleOptions = {}
): ((...args: Parameters<T>) => Promise<ReturnType<T>>) & {
  cancel: () => void
} {
  const { leading = true, trailing = false } = options
  let startTime: number = 0
  let timer: ReturnType<typeof setTimeout> | null = null

  function _throttle(this: any, ...args: Parameters<T>) {
    return new Promise<ReturnType<T>>((resolve, reject) => {
      try {
        const nowTime = Date.now()
        let result: ReturnType<T>
        if (!leading && startTime === 0) startTime = nowTime

        const waitTime = interval - (nowTime - startTime)
        if (waitTime <= 0) {
          if (timer) clearTimeout(timer)
          result = callback.apply(this, args)
          resolve(result)
          startTime = nowTime
          timer = null
          return
        }

        if (trailing && !timer) {
          timer = setTimeout(() => {
            result = callback.apply(this, args)
            resolve(result)
            startTime = Date.now()
            timer = null
          }, waitTime)
        }
      } catch (error) {
        reject(error)
      }
    })
  }

  _throttle.cancel = function () {
    if (timer) clearTimeout(timer)
    startTime = 0
    timer = null
  }

  return _throttle
}
