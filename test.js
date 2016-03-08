'use strict';

var abstractRegistry = require('./');

abstractRegistry({
  suites: [
    'publish',
    'pkg/dist-tag'
  ]
});
