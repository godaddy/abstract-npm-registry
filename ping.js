

const nit = require('./lib/nit')('GET /-/ping');
const requests = require('./lib/requests');

/**
 * Test coverage for the simple ping route
 * See: `curl http://{AUTH}@registry.npmjs.org/-/ping?write=true`
 */
module.exports.standard = nit(':api', function (opts) {
  return function (done) {
    requests.json({
      host: opts.registry,
      path: '/-/ping',
      method: 'GET',
      status: 200,
      body: {}
    }, done);
  };
});

module.exports.write = nit(':api?write=true', function (opts) {
  return function (done) {
    requests.json({
      host: opts.registry,
      path: '/-/ping?write=true',
      method: 'GET',
      status: 200,
      body: {}
    }, done);
  };
});
