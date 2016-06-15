'use strict';

const nit = require('./lib/nit')('/-/org/:scope');

/**
 * Test coverage for access control to public and private teams
 * See: "npm help team"
 */
module.exports.list = nit.skip('GET :api?format=cli', function (opts) {
  return function () {
    throw new Error('Not implemented.');
  };
});

//
// TODO: Write stubs for these functions
// npm team create <scope:team>
// npm team destroy <scope:team>
// npm team add <scope:team> <user>
// npm team rm <scope:team> <user>
// npm team edit <scope:team>
//
