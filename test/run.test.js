'use strict';

const abstractRegistry = require('../');

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
    //
    // TODO: The test is functional but we need to use private
    // credentials in Travis to unskip this.
    //
    // 'whoami',
    'team',
    'access',
    'views/all',
    'views/query'
  ]
}, function () {

});
