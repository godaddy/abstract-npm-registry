

const nit = require('./lib/nit')('DELETE /:pkg/-rev/:rev');

/**
 * Test coverage for unpublishing npm packages
 * See: "npm help unpublish"
 */
module.exports.singleVersion = nit.skip(':api for a single version', function () {
  return function () {
    throw new Error('Not implemented.');
  };
});

module.exports.lastVersion = nit.skip(':api for the last version', function () {
  return function () {
    throw new Error('Not implemented.');
  };
});

module.exports.allForce = nit.skip(':api for all versions (i.e. force)', function () {
  return function () {
    throw new Error('Not implemented.');
  };
});
