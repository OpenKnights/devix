import { bubblingSort } from '../src/sort'

test('bubbling sort', () => {
  const sourceNumberArr = [34, 325, 134, 63, 62, 631, 58, 3, 22, 54]
  let isNumberArrToDESC = true
  const sortNumberArr = bubblingSort(sourceNumberArr, 'DESC')
  sortNumberArr.map((num, index) => {
    if (isNumberArrToDESC === true)
      isNumberArrToDESC =
        num >=
        (index + 1 >= sortNumberArr.length ? 0 : sortNumberArr[index + 1])
          ? true
          : false
  })

  // console.log(`isNumberArrToDESC:`, isNumberArrToDESC)
  expect(isNumberArrToDESC).toBe(true)
})
