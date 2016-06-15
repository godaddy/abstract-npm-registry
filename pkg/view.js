'use strict';

var nit = require('../lib/nit')('GET /:pkg');
var request = require('supertest');

/**
 * Test coverage for getting JSON for npm packages
 * See: npm-registry-couchapp
 * https://github.com/npm/npm-registry-couchapp/blob/master/registry/rewrites.js#70-L74
 */
module.exports.found = nit(':api', function (opts) {
  opts.pkg = opts.pkg || 'smart-private-npm';
  return function (done) {
    request(opts.registry)
      .get(`/${opts.pkg}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      // .expect(function (res) {
      //   console.dir(res.body);
      // })
      .expect(200, done);
  };
});

module.exports.version = nit.skip(':api/:version', function (opts) {
  return function () {
    throw new Error('Not implemented.');
  };
});

module.exports.noPackage = nit.skip(':api for an unknown package', function (opts) {
  return function () {
    throw new Error('Not implemented.');
  };
});

module.exports.noVersion = nit.skip(':api/:version for an unknown version', function (opts) {
  return function () {
    throw new Error('Not implemented.');
  };
});
