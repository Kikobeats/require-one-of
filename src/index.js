'use strict'

const humanizeList = require('humanize-list')
const resolveFrom = require('resolve-from')
const assert = require('assert')
const path = require('path')

const cache = {}

const createError = modules =>
  new TypeError(
    `${humanizeList(modules.map(m => `'${m}'`), {
      conjunction: 'or'
    })} not found as dependency. Please, install one of them.`
  )

const relativeNodeModulesPath = path.resolve(__dirname, '..', '..')

/**
 * Normally, you are going to get node_modules from the current
 * execution path.
 *
 * This is not applied when you are running it using `npx`
 * In that case, node_modules is relative to the dependency itself.
 */
const resolveModule = module =>
  resolveFrom.silent(process.cwd(), module) || resolveFrom.silent(relativeNodeModulesPath, module)

const find = (modules, error = createError) => {
  for (const module of modules) {
    const modulePath = resolveModule(module)
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
