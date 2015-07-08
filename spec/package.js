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

describe('Unit: Package', function () {
  'use strict';

  // Ensure that bootstrap is setup properly.
  require('./helpers/argv').initialize();

  // The library under test
  var pkg = require('../lib/package');
  var licences = require('../lib/licences');

  it('Should extract the correct license from the package_Apache-2.0.json file', function () {
    process.argv.push('-p');
    process.argv.push('./spec/static/package_Apache-2.0.json');

    expect(pkg.getLicense()).toBe('Apache-2.0');
  });

  it('Should report UNKNOWN from the package_Apache_misspelled.json file',
    function () {
      process.argv.push('-p');
      process.argv.push('./spec/static/package_Apache_misspelled.json');

      expect(pkg.getLicense()).toBe(licences.UNKNOWN);
    });

  it('Should report UNKNOWN from the package_no_license.json file',
    function () {
      process.argv.push('-p');
      process.argv.push('./spec/static/package_Apache_misspelled.json');

      expect(pkg.getLicense()).toBe(licences.UNKNOWN);
    });
});
