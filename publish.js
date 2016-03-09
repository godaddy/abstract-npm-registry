'use strict';

var nit = require('./lib/nit')('POST /:pkg');

/**
 * Test coverage for publishing npm packages
 * See: "npm help publish"
 */
module.exports.valid = nit.skip(':api with a valid payload', function (opts) {
  return function () {
    throw new Error('Not implemented.');
  };
});

module.exports.invalid = nit.skip(':api with an invalid payload', function (opts) {
  return function () {
    throw new Error('Not implemented.');
  };
});
