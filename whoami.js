'use strict';

const nit = require('./lib/nit')('GET /-/whoami');

/**
 * Test coverage for the whoami route
 * See: curl https://{AUTH}@registry.npmjs.org/-/whoami
 */
module.exports.auth = nit.skip(':api with basic auth', function (opts) {
  return function () {
    throw new Error('Not implemented.');
  };
});

module.exports.bearerToken = nit.skip(':api with bearer token', function (opts) {
  return function () {
    throw new Error('Not implemented.');
  };
});

module.exports.noAuth = nit.skip(':api with no auth', function (opts) {
  return function () {
    throw new Error('Not implemented.');
  };
});
