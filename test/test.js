import { debounce } from '../dist/index.esm.js'

// function debounce(callback, delay = 0, immediate = false) {
//   let timer = null
//   let isInvoke = false
//   function _debounce(...args) {
//     return new Promise((resolve, reject) => {
//       try {
//         if (timer) clearTimeout(timer)

//         let result = undefined
//         if (immediate && !isInvoke) {
//           result = callback.apply(this, args)
//           resolve(result)
//           isInvoke = true
//           return
//         }

//         timer = setTimeout(() => {
//           result = callback.apply(this, args)
//           resolve(result)
//           timer = null
//           isInvoke = false
//         }, delay)
//       } catch (error) {
//         reject(error)
//       }
//     })
//   }

//   _debounce.cancel = function () {
//     if (timer) clearTimeout(timer)
//     timer = null
//     isInvoke = false
//   }

//   return _debounce
// }

// function throttle(
//   callback,
//   interval,
//   { leading = true, trailing = false } = {}
// ) {
//   let startTime = 0
//   let timer = null
//   function _throttle(...args) {
//     return new Promise((resolve, reject) => {
//       try {
//         const nowTime = Date.now()
//         let result = undefined
//         if (!leading && startTime === 0) startTime = nowTime

//         const waitTime = interval - (nowTime - startTime)
//         if (waitTime <= 0) {
//           if (timer) clearTimeout(timer)
//           result = callback.apply(this, args)
//           resolve(result)
//           startTime = nowTime
//           timer = null
//           return
//         }

//         if (trailing && !timer) {
//           timer = setTimeout(() => {
//             result = callback.apply(this, args)
//             resolve(result)
//             startTime = Date.now()
//             timer = null
//           }, waitTime)
//         }
//       } catch (error) {
//         reject(error)
//       }
//     })
//   }

//   _throttle.cancel = function () {
//     if (timer) clearTimeout(timer)
//     startTime = 0
//     timer = null
//   }

//   return _throttle
// }

// const foo1 = debounce(
//   (message) => {
//     console.log('message', message)
//     return message
//   },
//   3000,
//   true
// )

// const foop1 = foo1('111')
// foop1.then((res) => {
//   console.log(`res:`, res)
// })
// // foo1('222')
// foo1('333')

// setTimeout(() => {
//   foo1.cancel()
// }, 1000)

const foo3 = debounce(function (...args) {
  console.log('this', this)
  console.log('args', args)
})

const obj1 = {
  name: 'obj',
  foo3
}

obj1.foo3('333')
