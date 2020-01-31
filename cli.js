#!/usr/bin/env node
'use strict'

const napifn = require('.')
const argv = require('minimist')(process.argv.slice(2))
const patterns = argv._.length ? argv._ : ['*.cc', '*.c', '*.h']

napifn(patterns, function (err, functions) {
  if (err) throw err
  console.log(functions.join('\n'))
})
