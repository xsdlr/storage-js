# Install
```sh
npm i storage4js -S
```

# Example
```javascript
// ES6
import { localStorage, sessionStorage } from 'storage-js'
// ES5
var localStorage = require('storage-js').localStorage
var sessionStorage = require('storage-js').sessionStorage

// localStorage
localStorage.setItem('foo', 123, 1000) // params are key, value, ttl
localStorage.setItem('bar', 456) // when ttl is undefined the value will exist until remove it
console.log(localStorage.getItem('foo')) // 123
setTimeout(function () {
	console.log(localStorage.getItem('foo')) // undefined
	console.log(localStorage.getItem('bar')) // 456
}, 2000)
localStorage.removeItem('bar')
console.log(localStorage.getItem('bar')) // undefined
localStorage.clear() // all value will remove

// sessionStorage is most like window.sessionStorage, but the value can be any object
sessionStorage.setItem('foo', 789)
console.log(localStorage.getItem('foo')) // 789
sessionStorage.removeItem('foo') // undefined
sessionStorage.clear() // all value will remove
```
# Api
localStorage and sessionStorage is mostly like window.localStorage and window.sessionStorage
## localStorage
### setItem(key, value, ttl)
set a key-value into localStorage, value can be object. ttl is by milliseconds. if ttl is falsy value, the value will not have TTL.
### getItem(key)
get value by key. we will get value undefined if the TTL is over.
### removeItem(key)
remove value by key
### clear
clear all value
## sessionStorage
### setItem(key, value)
set a key-value into sessionStorage, value can be object. 
### getItem(key)
get value by key
### removeItem(key)
remove value by key
### clear
clear all value



