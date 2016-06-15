'use strict';

var abstractRegistry = require('../');

abstractRegistry({
  suites: [
    'pkg/show',
    'pkg/fetch',
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
  ]
}, function () {

});
