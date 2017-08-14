

const assume = require('assume');
const nit = require('./lib/nit')('GET /-/whoami');
const requests = require('./lib/requests');

/**
 * Test coverage for the whoami route
 * See: curl https://{AUTH}@registry.npmjs.org/-/whoami
 */
module.exports.auth = nit(':api with basic auth', function (opts) {
  return function (done) {
    requests.authed({
      host: opts.registry,
      username: opts.username,
      password: opts.password,
      path: '/-/whoami',
      method: 'GET',
      status: 200,
      body: { username: opts.username }
    }, done);
  };
});

module.exports.bearerToken = nit.skip(':api with bearer token', function (opts) {
  return function () {
    throw new Error('Not implemented.');
  };
});

module.exports.noAuth = nit(':api with no auth', function (opts) {
  return function (done) {
    requests.json({
      host: opts.registry,
      path: '/-/whoami',
      method: 'GET',
      status: 401,
      body: {}
    }, done);
  };
});
