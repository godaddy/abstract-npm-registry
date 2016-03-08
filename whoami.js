'use strict';

var nit = require('./lib/nit')('GET /-/whoami');

/**
 * Test coverage for the whoami route
 * See: curl https://{AUTH}@registry.npmjs.org/-/whoami
 */
module.exports.auth = nit.skip(':api', function (opts) {
  return function () {
    throw new Error('Not implemented.');
  };
});

module.exports.bearerToken = nit.skip(':api', function (opts) {
  return function () {
    throw new Error('Not implemented.');
  };
});

module.exports.noAuth = nit.skip(':api', function (opts) {
  return function () {
    throw new Error('Not implemented.');
  };
});
