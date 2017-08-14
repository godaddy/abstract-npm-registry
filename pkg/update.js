

const nit = require('../lib/nit')('PUT /:pkg');

/**
 * Test coverage for updating JSON of npm packages
 * See: npm-registry-couchapp
 * https://github.com/npm/npm-registry-couchapp/blob/master/registry/rewrites.js#L89-L90
 */
module.exports.correctRev = nit.skip(':api', function (opts) {
  return function () {
    throw new Error('Not implemented.');
  };
});

module.exports.conflict409 = nit.skip(':api (409 Update Conflict)', function (opts) {
  return function () {
    throw new Error('Not implemented.');
  };
});

/**
 * Test coverage for working with npm stars
 * See: "npm help star"
 *      "npm help stars"
 */
module.exports.star = nit.skip(':api?write=true (add star)', function (opts) {
  return function () {
    throw new Error('Not implemented.');
  };
});
