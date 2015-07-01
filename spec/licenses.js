/*
 * Copyright 2015 Michael Krotscheck
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
