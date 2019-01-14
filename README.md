# require-one-of

![Last version](https://img.shields.io/github/tag/Kikobeats/require-one-of.svg?style=flat-square)
[![Build Status](https://img.shields.io/travis/Kikobeats/require-one-of/master.svg?style=flat-square)](https://travis-ci.org/Kikobeats/require-one-of)
[![Coverage Status](https://img.shields.io/coveralls/Kikobeats/require-one-of.svg?style=flat-square)](https://coveralls.io/github/Kikobeats/require-one-of)
[![Dependency status](https://img.shields.io/david/Kikobeats/require-one-of.svg?style=flat-square)](https://david-dm.org/Kikobeats/require-one-of)
[![Dev Dependencies Status](https://img.shields.io/david/dev/Kikobeats/require-one-of.svg?style=flat-square)](https://david-dm.org/Kikobeats/require-one-of#info=devDependencies)
[![NPM Status](https://img.shields.io/npm/dm/require-one-of.svg?style=flat-square)](https://www.npmjs.org/package/require-one-of)

> Conditional require with fallback support. Minimal size (>700B), no dependencies.

## Install

```bash
$ npm install require-one-of --save
```

## Usage

```js
const requireOneOf = require('require-one-of')

// throw an error if `puppeteer` not found
require(['puppeteer'])

// throw an error if `puppeteer` or `puppeteer-core` not found
require(['puppeteer', 'puppeteer-core'])

// pass fn as second argument for setup custom error
requireOneOf(['puppeteer', 'puppeteer-core'], modules => {
  return new TypeError(
    `Uh, oh. ${modules
      .map(m => `'${m}'`)
      .join(',')} not found on dependencies`
  )
})
```

## API

### requireOneOf(modules, [fn])

#### input

*Required*<br>
Type: `array`

List of modules to be required. The first found will be resolved.

#### fn

Type: `function`

It exposes the function to call to create the error to be returned in case none of the modules are found.

## License

**require-one-of** © [Kiko Beats](https://kikobeats.com), released under the [MIT](https://github.com/Kikobeats/require-one-of/blob/master/LICENSE.md) License.<br>
Authored and maintained by Kiko Beats with help from [contributors](https://github.com/Kikobeats/require-one-of/contributors).

> [kikobeats.com](https://kikobeats.com) · GitHub [Kiko Beats](https://github.com/Kikobeats) · Twitter [@Kikobeats](https://twitter.com/Kikobeats)
