import { expect, test } from 'vitest'
import { deepClone, shallowClone } from '../src/clone'

test('testing shallowClone', () => {
  const obj1 = { name: 'king', age: 18, info: { count: 999 } }
  const obj2 = shallowClone(obj1)
  obj2.name = 'zsan'
  obj2.info.count = 20

  expect(obj1.name !== obj2.name).toBe(true)
  expect(obj1.info.count === obj2.info.count).toBe(true)
})

test('testing deepClone', () => {
  const obj1 = { name: 'king', age: 18, info: { count: 999 } }
  const obj2 = deepClone(obj1)
  obj2.name = 'coderking'
  obj2.info.count = 20

  expect(obj1.name !== obj2.name).toBe(true)
  expect(obj1.info.count !== obj2.info.count).toBe(true)
})
