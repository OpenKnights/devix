export enum SortType {
  ASC = 'ASC',
  DESC = 'DESC'
}

function swap<T>(array: T[], index1: number, index2: number): void {
  ;[array[index1], array[index2]] = [array[index2], array[index1]]
}

function compare<T>(value1: T, value2: T, type: SortType | string): boolean {
  return type === SortType.ASC ? value1 > value2 : value1 < value2
}

export function bubblingSort<T>(
  array: T[],
  type: string = 'ASC',
  key?: keyof T
): T[] {
  const { length } = array
  if (length < 2) return array

  for (let i = 0; i < length - 1; i++) {
    for (let j = 0; j < length - 1 - i; j++) {
      const value1 = key ? array[j][key] : array[j]
      const value2 = key ? array[j + 1][key] : array[j + 1]

      if (compare(value1, value2, type)) swap(array, j, j + 1)
    }
  }

  return array
}
