'use strict';

const nit = require('./lib/nit')('/-/package/:scope/:pkg/access');

/**
 * Test coverage for access control to public packages
 * See: "npm help access"
 */
module.exports.public = nit.skip('GET :api', function (opts) {
  return function () {
    throw new Error('Not implemented.');
  };
});

//
// TODO: Write stubs for these methods
// npm access restricted [<package>]
// npm access grant <read-only|read-write> <scope:team> [<package>]
// npm access revoke <scope:team> [<package>]
// npm access ls-packages [<user>|<scope>|<scope:team>]
// npm access ls-collaborators [<package> [<user>]]
// npm access edit [<package>]
//
