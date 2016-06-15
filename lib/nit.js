'use strict';

var diagnostics = require('diagnostics');
var debug = {
  define: diagnostics('abstract-npm-registry:define'),
  mocha: diagnostics('abstract-npm-registry:mocha')
};

/**
 * Returns function that sets the name of the `test`
 * function provided to be a one-level hierarchy of
 * `${route} ${name}`. This is useful for setting the
 * value passed to mocha `it`.
 *
 * @api public
 */
module.exports = function (route) {
  function nit(name, testFn) {
    //
    // We implement an encapsulated command pattern
    // here so that these are more easily consumable
    // both in our own "framework" or for our users.
    //
    var cmd = new NitTest(route, name, testFn);
    debug.define('it', cmd['it.name']);
    return cmd;
  }

  nit.skip = function (name, testFn) {
    var cmd = nit(name, testFn);
    cmd['it.skip'] = true;
    debug.define('skip', cmd['it.name']);
    return cmd;
  };

  return nit;
};

/**
 * Constructor function for the NitTest object that represents
 * a single "command" for self-invoking mocha tests.
 */
function NitTest(route, name, testFn) {
  this.route = route;
  this.name = name;
  this.fn = testFn;
  this['it.name'] = name.replace(':api', route);
  testFn['it.name'] = this['it.name'];
};

/**
 * The full display name that this instance should use
 * when presenting itself to a mocha `it` or `xit` function.
 */
Object.defineProperty(NitTest.prototype, 'displayName', {
  configurable: false,
  enumerable: true,
  get: function () {
    //
    // Setup names to be flexible about things
    //
    var testName = this['it.name'] || this.name;
    return this.prefix
      ? `(${this.prefix}) ${testName}`
      : testName;
  }
});

/**
 * Executes this "command" instance by scheduling the
 * stored test `fn` using the current global `mocha` context.
 */
NitTest.prototype.it = function (opts) {
  var skip = this['it.skip'];
  var itFn = skip && global.xit || global.it;
  var displayName = this.displayName;

  //
  // Replace any keys in the displayName with values
  // passed in through the options.
  //
  Object.keys(opts).forEach((key) => {
    displayName = displayName.replace(':' + key, opts[key]);
  });

  itFn(displayName, this.fn(opts));
};
