'use strict';

var path = require('path');
var Mocha = require('mocha');

module.exports = function (opts, callback) {
  opts = opts || {};
  var mocha = new Mocha;
  var rootd = path.resolve(__dirname) + '/';

  //
  // Do the bear minimum to the required mocha
  // instance to ensure that it is runnable.
  //
  mocha.reporter('spec');
  mocha.ui('bdd');
  mocha.files = [];

  (opts.suites || [
    'publish'
  ]).forEach(function (file) {
    //
    // We slightly modify the core mocha file loading logic
    // to expect each file to export a set of functions each of
    // which is the BODY OF AN IT STATEMENT.
    //
    file = path.resolve(file);
    var suite = mocha.suite;
    var target = require(file);

    suite.emit('pre-require', global, file, mocha);

    global.describe(file.replace(rootd, ''), function () {
      Object.keys(target).forEach(function (exp) {
        if (typeof target[exp] !== 'function') { return; }

        global.it(exp, target[exp](opts));
      });
    });
  });

  mocha.run(callback || function (code) {
    process.on('exit', function() { process.exit(code) });
  });
};
