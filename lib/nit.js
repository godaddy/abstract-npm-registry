'use strict';

var debug = require('diagnostics')('abstract-npm-registry:define');

/**
 * Returns function that sets the name of the `test`
 * function provided to be a one-level hierarchy of
 * `${route} ${name}`. This is useful for setting the
 * value passed to mocha `it`.
 *
 * @api public
 */
module.exports = function (route) {
  function nit(name, test) {
    test['it.name'] = name.replace(':api', route);
    debug('it', test['it.name']);
    return test;
  }

  nit.skip = function (name, test) {
    test['it.skip'] = true;
    test = nit(name, test);
    debug('skip', test['it.name']);
    return test;
  };

  return nit;
};
