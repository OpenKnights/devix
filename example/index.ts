import getDataType, { isType } from '../src/typeof'
import { deepClone } from '../src/clone'
import { stringCase } from '../src/others'
import createTestServer from '../src/server'

//! isType
const myName = 'King-3'
console.log(`isType myName -> 'string'`, isType('string', myName))

//! getDataType
const nullobj = null
console.log(`getDataType(nullobj) == 'null'`, getDataType(nullobj) == 'null')

//! deepClone
const obj1 = { name: 'king', age: 18, info: { count: 999 } }
const obj2 = { ...obj1 }
obj2.name = 'zsan'
obj2.info.count = 1433223
console.log(`obj1.info.count:`, obj1.info.count)
console.log(`obj2.info.count:`, obj2.info.count)
console.log(
  'obj1.info.count === obj2.info.count',
  obj1.info.count == obj2.info.count
)

console.log(`obj1.name:`, obj1.name)
console.log(`obj2.name:`, obj2.name)
console.log('obj2.name === obj1.name', obj2.name == obj1.name)

const obj3: typeof obj1 = deepClone(obj1)
obj3.info.count = 666
console.log(`obj3:`, obj3)
console.log(
  'obj1.info.count === obj3.info.count',
  obj1.info.count === obj3.info.count
)

//! stringCase
const dx1 = stringCase('load report', [' ', ''], ['lower', 'upper'])
console.log(`dx1:`, dx1)

//! test server
const routes = [
  {
    url: '/testGet',
    method: 'get',
    handler: async (ctx: any, next: any) => {
      ctx.body = {
        code: 200,
        data: {},
        message: `POST 接口测试: /testPost`
      }
    }
  }
]

let server = await createTestServer({ routes })
const prefix = (api: string) => `${server.url}${api}`
console.log(`createTestServer url:`, server.url)

fetch(prefix('/testGet'))
  .then((res) => res.json())
  .then((res) => {
    console.log(`res:`, res)
  })

setTimeout(() => {
  server.close()
}, 10000)
