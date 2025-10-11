import { SortType } from './types'

/**
 * Sorts an array of items into groups. The return value is a map where the keys are
 * the group ids the given getGroupId function produced and the value is an array of
 * each item in that group.
 */
export const group = <T, Key extends string | number | symbol>(
  array: readonly T[],
  getGroupId: (item: T) => Key
): Partial<Record<Key, T[]>> => {
  return array.reduce((acc, item) => {
    const groupId = getGroupId(item)
    if (!acc[groupId]) acc[groupId] = []
    acc[groupId].push(item)
    return acc
  }, {} as Record<Key, T[]>)
}

/**
 * Sort an array without modifying it and return
 * the newly sorted value
 */
export const sort = <T>(
  array: readonly T[],
  type: SortType = 'ASC',
  getter: (item: T) => number,
) => {
  if (!array) return []
  const asc = (a: T, b: T) => getter(a) - getter(b)
  const dsc = (a: T, b: T) => getter(b) - getter(a)
  return array.slice().sort(type === 'DESC' ? dsc : asc)
}

export function bubblingSort<T>(
  array: T[],
  type: SortType = 'ASC',
  getter: (item: T) => number = (i)=>(i as number),
): T[] {
  if (!(Array.isArray(array) && array.length > 1)) return array

  const compare = ((a: T, b: T) => {
    if(type === 'DESC') {
      return getter(b) - getter(a)
    }else{
      return getter(a) - getter(b)
    }
  })

  for (let i = 0; i < length - 1; i++) {
    let swapped = false

    for (let j = 0; j < length - 1 - i; j++) {
      if (compare(array[j], array[j + 1]) > 0) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]]
        swapped = true
      }
    }

    if (!swapped) break
  }

  return array
}

