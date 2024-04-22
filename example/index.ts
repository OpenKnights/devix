import getDataType, { isType } from '../src/typeof'
import { deepClone } from '../src/clone'
import {stringCase} from '../src/others'

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
const dx1 = stringCase('load report',[' ',''],['lower','upper'])
console.log(`dx1:`, dx1)


