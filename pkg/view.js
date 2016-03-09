'use strict';

var nit = require('../lib/nit')('GET /:pkg');

/**
 * Test coverage for getting JSON for npm packages
 * See: npm-registry-couchapp
 * https://github.com/npm/npm-registry-couchapp/blob/master/registry/rewrites.js#70-L74
 */
module.exports.found = nit.skip(':api', function (opts) {
  return function () {
    throw new Error('Not implemented.');
  };
});

module.exports.version = nit.skip(':api/:version', function (opts) {
  return function () {
    throw new Error('Not implemented.');
  };
});

module.exports.noPackage = nit.skip(':api for an unknown package', function (opts) {
  return function () {
    throw new Error('Not implemented.');
  };
});

module.exports.noVersion = nit.skip(':api/:version for an unknown version', function (opts) {
  return function () {
    throw new Error('Not implemented.');
  };
});
