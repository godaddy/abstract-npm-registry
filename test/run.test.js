'use strict';

var abstractRegistry = require('../');

abstractRegistry({
  suites: [
    'pkg/view',
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
