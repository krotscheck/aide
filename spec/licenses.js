describe('Unit: License List', function () {
  'use strict';

  var licenses = require('../lib/licences.js');
  var spdx = require('spdx-license-list');

  it('Should correctly identify SPDX licenses.', function () {
    /*eslint-disable guard-for-in */
    for (var key in spdx) {
      expect(licenses.isLicenseValid(key)).toBeTruthy();
    }
    /*eslint-enable guard-for-in */
  });

  it('Should correctly identify invalid license names.', function () {
    /*eslint-disable guard-for-in */
    for (var key in spdx) {
      expect(licenses.isLicenseValid('__' + key)).toBeFalsy();
    }
    /*eslint-enable guard-for-in */
  });
});
