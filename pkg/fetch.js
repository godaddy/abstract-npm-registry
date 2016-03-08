'use strict';

var nit = require('../lib/nit')('GET /:pkg/-/:att');

/**
 * Test coverage for downloading packages
 * See: "npm help install"
 *      "npm help pack -g"
 * https://github.com/npm/npm-registry-couchapp/blob/master/registry/rewrites.js#L88-L92
 */
module.exports.found = nit.skip(':api for a valid version', function (opts) {
  return function () {
    throw new Error('Not implemented.');
  };
});

module.exports.noVersion = nit.skip(':api for an invalid version', function (opts) {
  return function () {
    throw new Error('Not implemented.');
  };
});

module.exports.noPackage = nit.skip(':api for an invalid version', function (opts) {
  return function () {
    throw new Error('Not implemented.');
  };
});
