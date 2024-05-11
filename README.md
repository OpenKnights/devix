# devix

> Devix is a comprehensive, powerful, and compact JavaScript utility library.（ English | [简体中文](README_zh.md) ）

## Install

Please make sure you install this library using npm or another package manager in a Node.js environment.

```shell
npm install --save-dev devix
```

Then, utilize modern module bundling tools such as Vite or Webpack to import this library using modular syntax.

```javascript
// Using ES Module
import { [[ModuleName]] } from 'devix'

// Using CommonJS
const { [[ModuleName]]  } = require('devix')
```

## Usage

```javascript
import { bubblingSort, isType } from 'devix'

// Using bubblingSort、
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

// Using isType
console.log(`isType(userInfo,'object') -> true`, isType(userInfo, 'object'))
console.log(
  `isType(userInfo.name,'string') -> true`,
  isType(userInfo, 'string')
)
console.log(`isType(userInfo.age,'number') -> true`, isType(userInfo, 'number'))
```

## API

### Clone Apis

Methods for data cloning operations.

- deepClone
- shallowClone

### Retalimit Apis

Includes methods for controlling the frequency of operations.

- throttle
- debounce

### Sort Apis

Offers methods for various sorting operations.

- bubblingSort

### Time Apis

Consists of methods for handling time-related operations.

- formatTimer
- setTimer

### Typeof Apis

Methods for data type detection.

- isType

### Other Apis

Includes a variety of other functional functions and methods.

- compose
- currying
- insertStr
- stringCase
