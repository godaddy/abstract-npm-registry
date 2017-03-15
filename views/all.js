'use strict';

const assume = require('assume');
const nit = require('../lib/nit')('GET /-/all');
const requests = require('../lib/requests');

/**
 * Test coverage for listing all packages
 * See: npm-registry-couchapp
 * https://github.com/npm/npm-registry-couchapp/blob/master/registry/rewrites.js#L24
 * https://github.com/npm/npm-registry-couchapp/blob/master/registry/rewrites.js#L32-L33
 */
module.exports.index = nit(':api', function (opts) {
  return function (done) {
    requests.json({
      host: opts.registry,
      path: '/-/all/',
      method: 'GET',
      status: 404
    }, done);
  };
});

module.exports.since = nit(':api/since', function (opts) {
  return function (done) {
    requests.go({
      host: opts.registry,
      path: '/-/all/since',
      method: 'GET',
      status: 302,
      expect: function (res) {
        assume(res.headers.location).equals(
          `${opts.registry}/-/all/static/all.json`
        );
      }
    }, done);
  };
});

module.exports.static = nit(':api/static/all.json', function (opts) {
  return function (done) {
    var superquest = requests.json({
      host: opts.registry,
      path: '/-/all/static/all.json',
      method: 'GET',
      status: 200,
      expect: function (res) {
        assume(res.headers['content-length']).is.a('number');
      }
    }, done);

    //
    // This returns more than 100MB of JSON so we want to end it ASAP
    // since we are only asserting headers and response code.
    //
    superquest.req.on('response', function (res) {
      res.end();
    });
  };
});
