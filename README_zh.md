# devix

> devix 是一个全面的、强大的、紧凑的 JavaScript 实用程序库（ 简体中文 | [English](README.md) ）

## 安装

请确保您在 Node.js 环境下使用 npm 或其他包管理器安装此库。

```shell
npm install --save-dev devix
```

然后，利用现代的模块捆绑工具，如 Vite 或 Webpack，以模块化的语法引入此库。

```javascript
// 使用 ES Module
import { [[ModuleName]] } from 'devix'

// 使用 CommonJS
const { [[ModuleName]]  } = require('devix')
```

## 使用

```javascript
import { localCache, bubblingSort, isType } from 'devix'

// 使用 localCache
localCache.setCache('userInfo', { name: 'king', age: 18 })
const userInfo = localCache.get('userInfo')
console.log('userInfo', userInfo)

// 使用 bubblingSort、
const arr1 = [123, 346, 62, 2456, 56123, 1, 64, 61, 453, 72345]
const sortArr1 = bubblingSort(arr1, 'DESC')
console.log('sortArr1', sortArr1)
const arr2 = [
  { name: 'zsan', age: 16 },
  { name: 'lisi', age: 32 },
  { name: 'wawu', age: 25 },
  { name: 'king', age: 18 }
]
const sortArr2 = bubblingSort(arr2, 'DESC', 'age')
console.log('sortArr2', sortArr2)

// 使用 isType
console.log(`isType(userInfo,'object') -> true`, isType(userInfo, 'object'))
console.log(
  `isType(userInfo.name,'string') -> true`,
  isType(userInfo, 'string')
)
console.log(`isType(userInfo.age,'number') -> true`, isType(userInfo, 'number'))
```

## 方法

### 缓存相关

提供缓存操作的相关方法。

- localCache
- sessionCache

### 拷贝相关

用于数据复制操作的相关方法。

- deepClone
- shallowClone

### 限频相关

包含控制操作触发频率的相关方法。

- throttle
- debounce

### 排序相关

提供各种排序操作的方法。

- bubblingSort

### 时间相关

包括处理时间相关操作的方法。

- formatTimer
- setTimer

### 类型相关

用于数据类型检测的相关方法。

- isType

### 其他方法

包括各种其他功能性函数和方法。

- compose
- currying
- insertStr
- stringCase
