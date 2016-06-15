'use strict';

const nit = require('../lib/nit')('/-/package/:pkg/dist-tags');
const requests = require('../lib/requests');

/**
 * Test coverage for working with dist-tags on packages
 * See: "npm help dist-tag"
 */
module.exports.add = nit.skip('PUT :api/:tag', function (opts) {
  return function () {
    throw new Error('Not implemented.');
  };
});

module.exports.list = nit('GET :api', function (opts) {
  let pkg = opts.pkg || 'smart-private-npm';
  return function (done) {
    requests.json({
      host: opts.registry,
      method: 'GET',
      path: `/-/package/${pkg}/dist-tags`,
      status: 200,
      body: opts.body || { latest: '2.3.0' }
    }, done);
  };
});

module.exports.remove = nit.skip('DELETE :api/:tag', function (opts) {
  return function () {
    throw new Error('Not implemented.');
  };
});
