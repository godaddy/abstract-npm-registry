'use strict';

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
 * @param {function} done Continuation to pass control to when the supertest completes.
 */
module.exports.json = function (opts, done) {
  if (!opts.body && !opts.expect) {
    throw new Error('opts.body or opts.expect is required');
  }

  //
  // Override opts.expect if it is not provided
  //
  let expect = opts.expect || function (res) {
    assume(res.body).deep.equals(opts.body);
  };

  let method = opts.method.toLowerCase();
  return request(opts.host)
    [method](opts.path)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(expect)
    .expect(opts.status, done);
};
