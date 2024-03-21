import { currying, compose, insertStr, stringCase } from '../src/others'

test('currying', () => {
  const fn = currying((a: number, b: number, c: number) => {
    return a + b + c
  })

  const result = fn(1)(2)(3)
  expect(result).toEqual(6)
})

test('compose', () => {
  const cps: any = compose(
    (name: string) => name,
    (name: string) => name === 'coderking'
  )

  const result = cps('coderking')
  expect(result).toEqual(true)
})

test('insertStr', () => {
  const result = insertStr('coderking', 5, '-')
  expect(result).toEqual('coder-king')
})

test('stringCase', () => {
  const result = stringCase('coder king3', ' ', '-')
  expect(result).toEqual('Coder-King3')
})
