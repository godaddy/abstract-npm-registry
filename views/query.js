

const nit = require('../lib/nit')('GET /-');

/**
 * Test coverage for querying packages. Generally
 * older CouchDB views only available on "skimdb".
 * See: npm-registry-couchapp
 * https://github.com/npm/npm-registry-couchapp/blob/master/registry/rewrites.js#L35-L40
 * https://github.com/npm/npm-registry-couchapp/blob/master/registry/rewrites.js#L61-L64
 */
module.exports.scripts = nit.skip(':api/scripts', function () {
  return function () {
    throw new Error('Not implemented.');
  };
});

module.exports.byField = nit.skip(':api/by-field', function () {
  return function () {
    throw new Error('Not implemented.');
  };
});

module.exports.fields = nit.skip(':api/fields', function () {
  return function () {
    throw new Error('Not implemented.');
  };
});

module.exports.needBuild = nit.skip(':api/needbuild', function () {
  return function () {
    throw new Error('Not implemented.');
  };
});

module.exports.top = nit.skip(':api/top', function () {
  return function () {
    throw new Error('Not implemented.');
  };
});

module.exports.starredByUser = nit.skip(':api/starred-by-user/:user', function () {
  return function () {
    throw new Error('Not implemented.');
  };
});

module.exports.starredByPackage = nit.skip(':api/starred-by-package/:pkg', function () {
  return function () {
    throw new Error('Not implemented.');
  };
});
