'use strict'

const Parser = require('tree-sitter')
const cpp = require('tree-sitter-cpp')
const visit = require('unist-util-visit')
const deglob = require('deglob')
const parallel = require('run-parallel-limit')
const fs = require('fs')

module.exports = function (patterns, callback) {
  const result = new Set()
  const parser = new Parser()

  parser.setLanguage(cpp)

  deglob([].concat(patterns), function (err, files) {
    if (err) return callback(err)

    parallel(files.map(read), 4, function (err) {
      if (err) return callback(err)
      callback(null, Array.from(result))
    })
  })

  function read (file) {
    return function (next) {
      fs.readFile(file, 'utf8', function (err, data) {
        if (err) return next(err)

        const tree = parser.parse(data)
        const root = tree.rootNode

        visit(root, 'call_expression', visitCallExpr)
        next()
      })
    }
  }

  function visitCallExpr (node) {
    const id = node.children[0]
    const text = id.text

    if (id.type === 'identifier' && text.startsWith('napi_')) {
      result.add(text)
    }
  }
}
