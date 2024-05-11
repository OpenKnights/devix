import getDataType, { isType } from '../src/typeof'

test('testing isType', () => {
  const myName = 'King-3'
  expect(isType('string', myName)).toBe(true)
})

test('testing getDataType', () => {
  const nullobj = null
  expect(getDataType(nullobj)).toEqual('null')
})
