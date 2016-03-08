'use strict';

var path = require('path');
var debug = require('diagnostics')('abstract-npm-registry:mocha');
var Mocha = require('mocha');

module.exports = function (opts, callback) {
  opts = opts || {};
  var mocha = new Mocha;
  var rootd = path.resolve(__dirname, '..') + '/';

  //
  // Do the bear minimum to the required mocha
  // instance to ensure that it is runnable.
  //
  mocha.reporter('spec');
  mocha.ui('bdd');
  mocha.files = [];

  (opts.suites || [
    'pkg/view',
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
    var baseFile = file.replace(rootd, '');

    debug('pre-require', baseFile);
    suite.emit('pre-require', global, file, mocha);

    global.describe(baseFile, function () {
      Object.keys(target).forEach(function (exp) {
        if (typeof target[exp] !== 'function') { return; }

        var skip = target[exp]['it.skip'];
        var itFn = skip && global.xit || global.it;
        var testName =  target[exp]['it.name']
          ? `(${exp}) ${target[exp]['it.name']}`
          : exp;

        debug('schedule.it \n  %s \n %j', testName, {
          skip: skip,
          require: `${baseFile}.js`
        });
        itFn(testName, target[exp](opts));
      });
    });
  });

  debug('run suite');
  mocha.run(callback || function (code) {
    process.on('exit', function() { process.exit(code) });
  });
};
