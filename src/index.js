'use strict'

const resolveFrom = require('resolve-from')
const assert = require('assert')

const cache = {}

const createError = modules =>
  new TypeError(
    `${modules
      .map(m => `'${m}'`)
      .join(',')} not found as dependency. Please, install one of them.`
  )

const find = (modules, error = createError) => {
  assert(Array.isArray(modules), 'Need to provide a collection')

  for (const module of modules) {
    const modulePath = resolveFrom.silent(process.cwd(), module)
    if (modulePath) return require(modulePath)
  }

  throw error(modules)
}

module.exports = (modules, fn) => {
  const key = modules.join(',')
  return cache[key] || (cache[key] = find(modules, fn))
}

module.exports.cache = cache
