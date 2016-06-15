'use strict';

const abstractNpmRegistry = require('../')({
  registry: 'https://registry.npmjs.org',
  headers: { 'X-ANY-HEADER-YOU-WANT': true }
});

console.log('\n\n> Starting my custom test suite using mocha...');

describe('My custom test suite of defaults', function () {
  this.timeout(5000);

  abstractNpmRegistry.it('pkg/dist-tag.add');
  abstractNpmRegistry.it('pkg/dist-tag.list');
  abstractNpmRegistry.it('pkg/dist-tag.remove');

  abstractNpmRegistry.it('pkg/fetch.found');
  abstractNpmRegistry.it('pkg/fetch.noVersion');
  abstractNpmRegistry.it('pkg/fetch.noPackage');

  abstractNpmRegistry.it('pkg/update.correctRev');
  abstractNpmRegistry.it('pkg/update.conflict409');
  abstractNpmRegistry.it('pkg/update.star');

  abstractNpmRegistry.it('pkg/show.found');
  abstractNpmRegistry.it('pkg/show.version');
  abstractNpmRegistry.it('pkg/show.noPackage');
  abstractNpmRegistry.it('pkg/show.noVersion');

  abstractNpmRegistry.it('user/add.isNew');
  abstractNpmRegistry.it('user/add.existing');

  abstractNpmRegistry.it('user/logout.found');
  abstractNpmRegistry.it('user/logout.notFound');

  //
  // TODO: Write stubs for usage of
  // access.js
  // ping.js
  // publish.js
  // team.js
  // unpublish.js
  // whoami.js
  //
});
