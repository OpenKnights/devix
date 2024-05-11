import { compose, currying, insertStr, stringCase } from '../src/others'

test('testing currying', () => {
  const fn = currying((a: number, b: number, c: number) => {
    return a + b + c
  })

  const result = fn(1)(2)(3)
  expect(result).toEqual(6)
})

test('testing compose', () => {
  const cps: any = compose(
    (name: string) => name,
    (name: string) => name === 'coderking'
  )

  const result = cps('coderking')
  expect(result).toEqual(true)
})

test('testing insertStr', () => {
  const result = insertStr('coderking', 5, '-')
  expect(result).toEqual('coder-king')
})

test('testing stringCase', () => {
  const result = stringCase('coder king3', [' ', ''], ['lower', 'upper'])
  expect(result).toEqual('coderKing3')
})
