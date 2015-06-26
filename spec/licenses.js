describe('Unit: License List', function () {
  'use strict';

  var fs = require('fs');
  var path = require('path');

  // Construct a list of all license names.
  var licenseFolder = path.join(__dirname, '..', 'lib', 'licenses');
  var filenames = fs.readdirSync(licenseFolder);
  var licenseNames = [];
  filenames.forEach(function (fileName) {
    licenseNames.push(path.basename(fileName, '.txt'));
  });

  // The library under test
  var licenses = require('../lib/licences.js');

  it('Should correctly identify SPDX licenses.', function () {
    /*eslint-disable guard-for-in */
    for (var i = 0; i < licenseNames.length; i++) {
      var name = licenseNames[i];
      expect(licenses.isLicenseValid(name)).toBeTruthy();
    }
    /*eslint-enable guard-for-in */
  });

  it('Should correctly identify invalid license names.', function () {
    /*eslint-disable guard-for-in */
    for (var i = 0; i < licenseNames.length; i++) {
      var name = licenseNames[i];
      expect(licenses.isLicenseValid('__' + name)).toBeFalsy();
    }
    /*eslint-enable guard-for-in */
  });
});
