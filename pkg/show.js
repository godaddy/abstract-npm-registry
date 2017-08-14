

const nit = require('../lib/nit')('GET /:pkg');
const requests = require('../lib/requests');
const request = require('supertest');
const assume = require('assume');

/**
 * Test coverage for getting JSON for npm packages
 * See: npm-registry-couchapp
 * https://github.com/npm/npm-registry-couchapp/blob/master/registry/rewrites.js#70-L74
 */
module.exports.found = nit(':api', function (opts) {
  const pkg = opts.pkg || 'smart-private-npm';
  return function (done) {
    requests.json({
      host: opts.registry,
      method: 'GET',
      path: `/${pkg}`,
      status: 200,
      expect: function (res) {
        const doc = res.body;
        assume(doc).is.an('object');
        assume(doc.name).equals(pkg);
        assume(doc._id).equals(pkg);
        assume(doc.versions).is.an('object');
        assume(doc.time).is.an('object');

        if (opts.expect) {
          opts.expect(res, assume);
        }
      }
    }, done);
  };
});

module.exports.version = nit(':api/:version', function (opts) {
  const pkg = opts.pkg || 'smart-private-npm';
  const version = opts.version || '2.3.0';

  return function (done) {
    requests.json({
      host: opts.registry,
      method: 'GET',
      path: `/${pkg}/${version}`,
      status: 200,
      expect: function (res) {
        const doc = res.body;
        assume(doc).is.an('object');
        assume(doc.version).equals(version);

        if (opts.expect) {
          opts.expect(doc, assume);
        }
      }
    }, done);
  };
});

module.exports.noPackage = nit(':api for an unknown package', function (opts) {
  const pkg = opts.pkg || 'i-am-no-exist-' + Date.now();

  return function (done) {
    requests.json({
      host: opts.registry,
      method: 'GET',
      path: `/${pkg}`,
      status: 404,
      //
      // Remark: Since this is a CouchDB / implementation specific error, we may
      // want to consider only enabling this assertion in a "strict mode".
      //
      body: {}
    }, done);
  };
});

module.exports.noVersion = nit(':api/:version for an unknown version', function (opts) {
  const pkg = opts.pkg || 'i-am-no-exist-' + Date.now();
  const version = opts.version || '0.0.1';

  return function (done) {
    requests.json({
      host: opts.registry,
      method: 'GET',
      path: `/${pkg}/${version}`,
      status: 404,
      //
      // Remark: Since this is a CouchDB specific error, we may
      // want to consider only enabling this assertion in a "strict mode".
      //
      body: {
        error: 'not_found',
        reason: 'document not found'
      }
    }, done);
  };
});
