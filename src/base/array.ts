import { SortType } from './types'
export {}

/* Sort */

// bubblingSort
export function bubblingSort<T>(
  array: T[],
  type: string = 'ASC',
  key?: keyof T
): T[] {
  const { length } = array

  if (length < 2) return array

  for (let i = 0; i < length - 1; i++) {
    for (let j = 0; j < length - 1 - i; j++) {
      const val1 = key ? array[j][key] : array[j]
      const val2 = key ? array[j + 1][key] : array[j + 1]

      if (type === SortType.ASC ? val1 > val2 : val1 < val2) {
        ;[array[j], array[j + 1]] = [array[j + 1], array[j]]
      }
    }
  }

  return array
}
