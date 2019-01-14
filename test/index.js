'use strict'

const test = require('ava')
const requireOneOf = require('..')

test('need to pass an array', t => {
  const error = t.throws(() => {
    requireOneOf('one')
  })

  t.is(error.message, 'Need to provide a collection')
})

test('one', t => {
  const error = t.throws(() => {
    requireOneOf(['one'])
  }, TypeError)

  t.is(
    error.message,
    "'one' not found as dependency. Please, install one of them."
  )
})

test('more than one', t => {
  const error = t.throws(() => {
    requireOneOf(['one', 'two'])
  }, TypeError)

  t.is(
    error.message,
    "'one','two' not found as dependency. Please, install one of them."
  )
})

test('custom error', t => {
  const error = t.throws(() => {
    requireOneOf(['one', 'two'], modules => {
      return new TypeError(
        `Uh, oh. ${modules
          .map(m => `'${m}'`)
          .join(',')} not found on dependencies`
      )
    })
  }, TypeError)

  t.is(error.message, "Uh, oh. 'one','two' not found on dependencies")
})

test.only('cache based on input', t => {
  requireOneOf(['ava'])
  t.true(!!requireOneOf.cache.ava)
  requireOneOf(['finepack', 'ava'])
  t.true(!!requireOneOf.cache['finepack,ava'])
})
