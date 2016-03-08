# abstract-npm-registry

An test suite and interface for you can use to test various functional areas of an npm registry.

## Motivation

Understanding the wire protocol expected by the npm CLI is incredibly important. Without a thorough, accurate, and open representation of this HTTP-based API a number of important scenarios to the success of the Node.js ecosystem are largely impossible and definitely improbable:

- Interoperability between registries (e.g. [migrating between two private registries][registry-migrate]).
- Evaluation of local developer solutions (e.g. _"Should I use [sinopia] or [local-npm]?"_).
- More sophisticated developer tooling built on top of `npm` (e.g. a remote `npm` **post-publish** hook similar to a `git` post-commit hook).

This project is an attempt to document the public `npm` wire protocol for these reasons and more by creating an open and extendible test suite for anyone to use and contribut to. It pulls data from multiple sources:

1. [npm/npm-registry-couchapp]: technically "deprecated", but largely the most accurate representation of the the public npm API.
2. [npm/npm-registry-client]: all references to `url.resolve` represent one or more routes that `Client` instances consume when used by the `npm` CLI.
3. [npm/newwww] and [npm/public-api]: a loosely coupled set of internal APIs that have added to the original API exposed in [npm/npm-registry-couchapp].

## Usage

This library uses `mocha` for tests.

``` js
var abstractRegistry = require('abstract-npm-registry');
var registry = abstractRegistry('https://registry.npmjs.org');

//
// Runs an entire suite
//
registry.run();
```

[npm/npm-registry-couchapp]: https://github.com/npm/npm-registry-couchapp/blob/master/registry/rewrites.js
[npm/npm-registry-client]: https://github.com/npm/npm-registry-client/search?utf8=%E2%9C%93&q=url.resolve%28
[npm/newwww]: https://github.com/npm/newww/tree/master/agents
[npm/public-api]: https://github.com/npm/public-api
