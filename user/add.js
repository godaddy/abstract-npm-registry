'use strict';

var nit = require('../lib/nit')('PUT /-/user/org.couchdb.user:[:user]');

/**
 * Test coverage for adding new npm users
 * See: "npm help adduser", npm-registry-client, npm-registry-couchapp
 * https://github.com/npm/npm-registry-client/blob/master/lib/adduser.js#L35-L62
 * https://github.com/npm/npm-registry-couchapp/blob/master/registry/rewrites.js#L48-L53
 */
module.exports.isNew = nit.skip(':api when the user is new.', function (opts) {
  return function () {
    throw new Error('Not implemented.');
  };
});

module.exports.existing = nit.skip(':api when the user exists', function (opts) {
  return function () {
    throw new Error('Not implemented.');
  };
});
