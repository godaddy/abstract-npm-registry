'use strict';

const abstractNpmRegistry = require('../')({
  registry: 'https://registry.npmjs.org',
  headers: { 'X-ANY-HEADER-YOU-WANT': true }
});

console.log('\n\n> Starting my custom test suite with overrides using mocha...');

describe('My extended custom test suite', function () {
  this.timeout(5000);

  // abstractNpmRegistry.it('pkg/dist-tag.add');
  abstractNpmRegistry.it('pkg/dist-tag.list', {
    pkg: 'winston',
    body: { latest: '2.2.0' }
  });
  // abstractNpmRegistry.it('pkg/dist-tag.remove');

  // abstractNpmRegistry.it('pkg/fetch.found');
  // abstractNpmRegistry.it('pkg/fetch.noVersion');
  // abstractNpmRegistry.it('pkg/fetch.noPackage');

  // abstractNpmRegistry.it('pkg/update.correctRev');
  // abstractNpmRegistry.it('pkg/update.conflict409');
  // abstractNpmRegistry.it('pkg/update.star');

  abstractNpmRegistry.it('pkg/show.found', {
    pkg: 'winston',
    expect: ((res, assume) => {
      let doc = res.body;
      assume(doc.name).equal('winston');
    })
  });

  abstractNpmRegistry.it('pkg/show.version', {
    pkg: 'winston',
    version: '2.0.0'
  });

  abstractNpmRegistry.it('pkg/show.noPackage', {
    pkg: 'this-no-exist-for-reals-' + Date.now()
  });

  abstractNpmRegistry.it('pkg/show.noVersion', {
    pkg: 'this-no-exist-for-reals-' + Date.now(),
    version: '0.0.1'
  });

  // abstractNpmRegistry.it('user/add.isNew');
  // abstractNpmRegistry.it('user/add.existing');

  // abstractNpmRegistry.it('user/logout.found');
  // abstractNpmRegistry.it('user/logout.notFound');
});
