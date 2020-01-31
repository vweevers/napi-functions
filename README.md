# napi-functions

> **List the N-API functions used in c/c++ source code.**

[![npm status](http://img.shields.io/npm/v/napi-functions.svg)](https://www.npmjs.org/package/napi-functions)
[![node](https://img.shields.io/node/v/napi-functions.svg)](https://www.npmjs.org/package/napi-functions)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Usage

```js
const napifn = require('napi-functions')

napifn(['*.cc'], function (err, functions) {
  if (err) throw err
  console.log(functions)
})
```

## CLI

### `napi-functions [glob pattern, ..]`

## Install

With [npm](https://npmjs.org) do:

```
npm install napi-functions
```

## License

[MIT](LICENSE.md) © 2020-present Vincent Weevers
