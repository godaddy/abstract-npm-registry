'use strict';

const nit = require('../lib/nit')('GET /-/all');

/**
 * Test coverage for listing all packages
 * See: npm-registry-couchapp
 * https://github.com/npm/npm-registry-couchapp/blob/master/registry/rewrites.js#L24
 * https://github.com/npm/npm-registry-couchapp/blob/master/registry/rewrites.js#L32-L33
 */
module.exports.full = nit.skip(':api', function (opts) {
  return function () {
    throw new Error('Not implemented.');
  };
});

module.exports.since = nit.skip(':api/since', function (opts) {
  return function () {
    throw new Error('Not implemented.');
  };
});
