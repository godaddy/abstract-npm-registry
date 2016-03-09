# abstract-npm-registry

An open and extendible test suite for you can use to test various functional areas of an npm registry.

## Motivation

Understanding the wire protocol expected by the npm CLI is incredibly important. Without a thorough, accurate, and open representation of this HTTP-based API a number of important scenarios to the success of the Node.js ecosystem are largely impossible and definitely improbable:

- Interoperability between registries (e.g. [migrating between two private registries][registry-migrate]).
- Evaluation of local developer solutions (e.g. _"Should I use [sinopia] or [local-npm]?"_).
- More sophisticated developer tooling built on top of `npm` (e.g. a remote `npm` **post-publish** hook similar to a `git` post-commit hook).

This project is an attempt to document the public `npm` wire protocol for these reasons and more by creating an open and extendible test suite for anyone to use and contribute to. It pulls data from multiple sources:

1. [npm/npm-registry-couchapp]: technically "deprecated", but largely the most accurate representation of the the public npm API.
2. [npm/npm-registry-client]: all references to `url.resolve` represent one or more routes that `Client` instances consume when used by the `npm` CLI.
3. [npm/newwww] and [npm/public-api]: a loosely coupled set of internal APIs that have added to the original API exposed in [npm/npm-registry-couchapp].

## Usage

`abstract-npm-registry` uses `mocha` and `assume` for test execution and assertion. Most common configurations can be accomplished by using the micro-runner provided by `abstract-npm-registry`.

``` js
var abstractNpmRegistry = require('abstract-npm-registry');

//
// Runs the entire suite of tests
//
abstractNpmRegistry({
  registry: 'https://registry.npmjs.org',
  headers: {
    'X-ANY-HEADER-YOU-WANT': true
  },
  //
  // By default all of these suites are
  // included.
  //
  suites: [
    'publish',
    'unpublish'
  ]
});
```

_**n.b. By default all test suites are included**_

``` js
  suites: [
    'pkg/view',
    'pkg/fetch',
    'pkg/version',
    'publish',
    'unpublish',
    'pkg/dist-tag',
    'user/add',
    'user/logout',
    'pkg/update',
    'ping',
    'whoami',
    'team',
    'access',
    'views/all',
    'views/query'
  ]
```

Want more options or more granular options? Use `abstract-npm-registry` with `mocha` directly (see below) or [open an issue!](https://github.com/warehouseai/abstract-npm-registry).

### Using with `mocha` directly

Each named export on any `require`able "suite" exposed by `abstract-npm-registry` is simply **a function that returns an `it` function.** The returned function can be passed to `it` in any `mocha` suite. e.g.

**my.custom.test.js**
``` js
var abstractNpmRegistry = require('../')({
  registry: 'https://registry.npmjs.org',
  headers: { 'X-ANY-HEADER-YOU-WANT': true }
});

console.log('\n\n> Starting my custom test suite using mocha...');

describe('My super custom test suite', function () {
  abstractNpmRegistry.it('pkg/dist-tag.add');
  abstractNpmRegistry.it('pkg/dist-tag.list');
  abstractNpmRegistry.it('pkg/dist-tag.remove');

  abstractNpmRegistry.it('pkg/fetch.found');
  abstractNpmRegistry.it('pkg/fetch.noVersion');
  abstractNpmRegistry.it('pkg/fetch.noPackage');
});
```

[npm/npm-registry-couchapp]: https://github.com/npm/npm-registry-couchapp/blob/master/registry/rewrites.js
[npm/npm-registry-client]: https://github.com/npm/npm-registry-client/search?utf8=%E2%9C%93&q=url.resolve%28
[npm/newwww]: https://github.com/npm/newww/tree/master/agents
[npm/public-api]: https://github.com/npm/public-api
[local-npm]: https://github.com/nolanlawson/local-npm#readme
[sinopia]: https://github.com/rlidwka/sinopia#readme
[registry-migrate]: https://github.com/jcrugzz/registry-migrate#readme
