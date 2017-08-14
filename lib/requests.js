/* eslint-disable no-undefined */
const assume = require('assume');
const request = require('supertest');

/**
 * Simple boilerplate for supertest which accepts the most common
 * options required to make a request to the npm registry.
 *
 * @param {Object} opts Options for making the request. All are required except one of
 *                      `opts.body` or `opts.expect` may be omitted.
 *   - opts.host {string} Full host of the npm registry (e.g. https://registry.npmjs.org)
 *   - opts.method {string} HTTP method for the request
 *   - opts.path {string} Relative path for the request (e.g. /winston/2.0.0)
 *   - opts.expect {function} Assertion function for the response
 *   - opts.body {Object}
 *   - opts.status {number} Expected status code
 * @param {function} setup **Optional** Extends the supertest instance before execution.
 * @param {function} done Continuation to pass control to when the supertest completes.
 */
module.exports.go = function (opts, setup, done) {
  //
  // Allow for an optional setup function for more helpers
  // to be based on this.
  //
  if (arguments.length === 2) {
    done = setup;
    setup = undefined;
  }

  //
  // Override opts.expect if it is not provided
  //
  // eslint-disable-next-line no-unused-vars
  let expect = opts.expect || function (res) {};
  if (opts.body && !opts.expect) {
    expect = function (res) {
      assume(res.body).deep.equals(opts.body);
    };
  }

  const method = opts.method.toLowerCase();
  let superquest = request(opts.host)[method](opts.path);
  if (setup) {
    superquest = setup(superquest);
  }

  superquest
    .expect(expect)
    .expect(opts.status, done);
};

/**
 * Sets expected JSON headers on the request and expects
 * them on the response.
 * @param  {[type]}   opts  [description]
 * @param  {[type]}   setup [description]
 * @param  {Function} done  [description]
 */
module.exports.json = function (opts, setup, done) {
  //
  // Allow for an optional setup function for more helpers
  // to be based on this.
  //
  if (arguments.length === 2) {
    done = setup;
    setup = undefined;
  }

  module.exports.go(opts, (superquest) => {
    if (setup) {
      superquest = setup(superquest);
    }

    return superquest
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/);
  }, done);
};

/**
 * Simple wrapper to our JSON expectation which also accepts auth.
 * @param  {[type]}   opts [description]
 * @param  {Function} done [description]
 */
module.exports.authed = function (opts, done) {
  assume(opts.username).is.a('string', '**Set this with NPM_USERNAME environment variable**');
  assume(opts.password).is.a('string', '**Set this with NPM_PASSWORD environment variable**');

  module.exports.json(opts, (superquest) => {
    return superquest.auth(opts.username, opts.password);
  }, done);
};
