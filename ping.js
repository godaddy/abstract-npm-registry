'use strict';

var nit = require('./lib/nit')('GET /-/ping');


/**
 * Test coverage for the simple ping route
 * See: `curl http://{AUTH}@registry.npmjs.org/-/ping?write=true`
 */
module.exports.standard = nit.skip(':api?write=true', function (opts) {
  return function () {
    throw new Error('Not implemented.');
  };
});

module.exports.write = nit.skip(':api?write=true', function (opts) {
  return function () {
    throw new Error('Not implemented.');
  };
});
