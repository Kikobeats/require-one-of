'use strict'

const resolveFrom = require('resolve-from')
const assert = require('assert')

const resolveCwd = resolveFrom.silent.bind(resolveFrom, process.cwd())

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
    const modulePath = resolveCwd(module)
    if (modulePath) return require(modulePath)
  }

  throw error(modules)
}

module.exports = (modules, fn) => {
  const key = modules.join(',')
  return cache[key] || (cache[key] = find(modules, fn))
}

module.exports.cache = cache
