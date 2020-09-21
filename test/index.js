'use strict'

const test = require('ava')
const requireOneOf = require('..')

test('need to pass an array', t => {
  t.throws(
    () => {
      requireOneOf('one')
    },
    {
      message: 'Need to provide a collection'
    }
  )
})

test('one', t => {
  t.throws(
    () => {
      requireOneOf(['one'])
    },
    {
      instanceOf: TypeError,
      message: "'one' not found as dependency. Please, install one of them."
    }
  )
})

test('more than one', t => {
  t.throws(
    () => {
      requireOneOf(['one', 'two'])
    },
    {
      instanceOf: TypeError,
      message: "'one' or 'two' not found as dependency. Please, install one of them."
    }
  )
})

test('custom error', t => {
  t.throws(
    () => {
      requireOneOf(['one', 'two'], modules => {
        return new TypeError(
          `Uh, oh. ${modules.map(m => `'${m}'`).join(',')} not found on dependencies`
        )
      })
    },
    {
      instanceOf: TypeError,
      message: "Uh, oh. 'one','two' not found on dependencies"
    }
  )
})

test('cache based on input', t => {
  requireOneOf(['ava'])
  t.true(!!requireOneOf.cache.ava)
  requireOneOf(['finepack', 'ava'])
  t.true(!!requireOneOf.cache['finepack,ava'])
})
