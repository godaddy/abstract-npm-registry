'use strict';

const path = require('path');
const debug = require('diagnostics')('abstract-npm-registry');

/**
 * Creates a new instance of AbstractNpmRegistry and
 * "immediately" runs it.
 */
module.exports = function (opts, callback) {
  opts = opts || {};
  opts.registry = opts.registry || 'https://registry.npmjs.org';

  var suite = new AbstractNpmRegistry(opts);
  if (callback || opts.run) {
    setImmediate(function () { suite.run(callback); });
  }

  return suite;
};

//
// Expose our AbstractNpmRegistry in case we need it
// and/or for testability.
//
module.exports.AbstractNpmRegistry = AbstractNpmRegistry;

/**
 * Constructor function for the AbstractNpmRegistry object
 * which is responsible for holding all of the state of a
 * run against a registry endpoint.
 */
function AbstractNpmRegistry(opts) {
  this.opts = opts || {};
  this.rootd = path.resolve(__dirname) + '/';
  this.parse = /^([^\.]+)\.(.*)$/;
};

/**
 * Returns the resulting function of evaluating and invoking the
 * `${module}.${export}` expression with the options associated with
 * this instance.
 */
AbstractNpmRegistry.prototype.it = function (expr, extend) {
  var opts = this.opts;
  var match;

  if ((match = this.parse.exec(expr))) {
    let basefile = match[1];
    let method = match[2];
    let fullpath = path.resolve(this.rootd, basefile);

    if (extend) {
      //
      // Remark: we DO NOT WANT to remember `extend` here
      // since the calls to `it` may be mutually exclusive.
      //
      opts = Object.assign({}, this.opts, extend);
    }

    debug('require %s', fullpath);
    let suite = require(fullpath);
    debug('invoke %s.%s(opts)', basefile, method);
    suite[method].it(opts);
  }

  return this;
};

/**
 * Schedules all of the specified suites specified in the
 * shallow merge of `extend` and `this.opts` invoking the
 * optional callback or exiting the process.
 */
AbstractNpmRegistry.prototype.run = function (extend, callback) {
  if (!callback && typeof extend === 'function') {
    callback = extend;
    extend = null;
  }

  if (extend) {
    this.opts = Object.assign(this.opts, extend);
  }

  debug('run suite %s', JSON.stringify(this.opts, null, 2));
  require('./lib/schedule')(this.opts)
    .run(callback || function (code) {
      process.on('exit', function() { process.exit(code) });
    });

  return this;
};
