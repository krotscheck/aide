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
    for (var i = 0; i < licenseNames.length; i++) {
      var name = licenseNames[i];
      expect(licenses.isLicenseValid(name)).toBeTruthy();
    }
  });

  it('Should correctly identify invalid license names.', function () {
    for (var i = 0; i < licenseNames.length; i++) {
      var name = licenseNames[i];
      expect(licenses.isLicenseValid('__' + name)).toBeFalsy();
    }
  });

  it('Should return the full text of every registered license.', function () {
    for (var i = 0; i < licenseNames.length; i++) {
      var name = licenseNames[i];
      var filePath = path.join(__dirname, '..', 'lib', 'licenses', name + '.txt');
      var fileContent = fs.readFileSync(filePath).toString();
      expect(licenses.getLicense(name)).toEqual(fileContent);
    }
  });

  it('Should return null if an invalid license is requested.', function () {
    for (var i = 0; i < licenseNames.length; i++) {
      var name = licenseNames[i];
      expect(licenses.getLicense('__' + name)).toBeNull();
    }
  });
});
