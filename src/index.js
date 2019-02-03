'use strict'

const resolveFrom = require('resolve-from')
const humanizeList = require('humanize-list')
const assert = require('assert')

const cache = {}

const createError = modules =>
  new TypeError(
    `${humanizeList(
      modules.map(m => `'${m}'`)
    )} not found as dependency. Please, install one of them.`
  )

const find = (modules, error = createError) => {
  for (const module of modules) {
    const modulePath = resolveFrom.silent(process.cwd(), module)
    if (modulePath) return require(modulePath)
  }

  throw error(modules)
}

module.exports = (modules, fn) => {
  assert(Array.isArray(modules), 'Need to provide a collection')
  const key = modules.join(',')
  return cache[key] || (cache[key] = find(modules, fn))
}

module.exports.cache = cache
