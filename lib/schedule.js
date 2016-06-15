'use strict';

var path = require('path');
var debug = require('diagnostics')('abstract-npm-registry:mocha');
var Mocha = require('mocha');

/**
 * Simple implementation of a mocha test runner to decouple
 * `abstract-npm-registry` from the `mocha` and `_mocha` binaries.
 * This is necessary because of how we separate the concerns of
 * DEFINING A TEST as a stand-alone export and SCHEDULING A TEST
 * with `mocha`.
 */
module.exports = function (opts, callback) {
  var mocha = new Mocha;
  var rootd = path.resolve(__dirname, '..') + path.sep;

  //
  // Do the bear minimum to the required mocha
  // instance to ensure that it is runnable.
  //
  mocha.reporter('spec');
  mocha.ui('bdd');
  mocha.files = [];

  (opts.suites || [
    'pkg/show',
    'pkg/fetch',
    'pkg/version',
    'publish',
    'unpublish',
    'pkg/dist-tag',
    'user/add',
    'user/logout',
    'pkg/update',
    'ping',
    'whoami',
    'team',
    'access',
    'views/all',
    'views/query'
  ]).forEach(function (file) {
    //
    // We slightly modify the core mocha file loading logic
    // to expect each file to export a set of functions each of
    // which is the BODY OF AN IT STATEMENT.
    //
    file = path.resolve(rootd, file);
    var suite = mocha.suite;
    var target = require(file);
    var basefile = file.replace(rootd, '');

    debug('pre-require', basefile);
    suite.emit('pre-require', global, file, mocha);

    global.describe(basefile, function () {
      Object.keys(target).forEach(function (exp) {
        var cmd = target[exp];
        if (typeof cmd.it !== 'function') {
          return;
        }

        cmd.prefix = exp;
        debug('schedule.it \n  %s \n  %j', cmd.displayName, {
          skip: cmd['it.skip'],
          require: `${basefile}.js`
        });

        cmd.it(opts);
      });
    });
  });

  return mocha;
};
