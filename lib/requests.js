'use strict';

const request = require('supertest');

/**
 * Simple boilerplate for supertest which accepts the most common
 * options required to make a request to the npm registry.
 *
 * @param {Object} opts Options for making the request. All are required.
 *   - opts.host {string} Full host of the npm registry (e.g. https://registry.npmjs.org)
 *   - opts.method {string} HTTP method for the request
 *   - opts.path {string} Relative path for the request (e.g. /winston/2.0.0)
 *   - opts.expect {function} Assertion function for the response
 *   - opts.status {number} Expected status code
 * @param {function} done Continuation to pass control to when the supertest completes.
 */
module.exports.json = function (opts, done) {
  let method = opts.method.toLowerCase();
  return request(opts.host)
    [method](opts.path)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(opts.expect)
    .expect(opts.status, done);
};
