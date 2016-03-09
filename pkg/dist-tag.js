'use strict';

var nit = require('../lib/nit')('/-/package/:pkg/dist-tags');

/**
 * Test coverage for working with dist-tags on packages
 * See: "npm help dist-tag"
 */
module.exports.add = nit.skip('PUT :api/:tag', function (opts) {
  return function () {
    throw new Error('Not implemented.');
  };
});

module.exports.list = nit.skip('GET :api', function (opts) {
  return function () {
    throw new Error('Not implemented.');
  };
});

module.exports.remove = nit.skip('DELETE :api/:tag', function (opts) {
  return function () {
    throw new Error('Not implemented.');
  };
});
