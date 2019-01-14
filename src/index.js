'use strict'

const assert = require('assert')

const CACHE = {}

const load = module => {
  try {
    return require(module)
  } catch (e) {
    return null
  }
}

const createError = modules =>
  new TypeError(
    `${modules
      .map(m => `'${m}'`)
      .join(',')} not found as dependency. Please, install one of them.`
  )

const find = (modules, error = createError) => {
  assert(Array.isArray(modules), 'Need to provide a collection')
  const module = modules.find(load)
  if (module) return module
  throw error(modules)
}

module.exports = (modules, fn) => {
  const key = modules.join(',')
  return CACHE[key] || (CACHE[key] = find(modules, fn))
}

module.exports.CACHE = CACHE
