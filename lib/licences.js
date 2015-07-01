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

(function () {
  'use strict';

  var fs = require('fs');
  var path = require('path');

  // Warm up the license cache.
  var licenseFolder = path.join(__dirname, 'licenses');
  var filenames = fs.readdirSync(licenseFolder);
  var licenseCache = {};
  filenames.forEach(function (fileName) {
    var licenseName = path.basename(fileName, '.txt');
    var licensePath = path.join(licenseFolder, fileName);
    var licenseContent = fs.readFileSync(licensePath);
    licenseCache[licenseName] = licenseContent.toString();
  });

  /**
   * Assert that the passed license name matches the SPDX name.
   *
   * @param {String} name The name of the license.
   * @returns {boolean} True if valid, otherwise false.
   */
  function isLicenseValid (name) {
    return licenseCache.hasOwnProperty(name);
  }

  /**
   * Returns the full text of a license, by SPDX name.
   *
   * @param {String} name The name of the license, using the SPDX Standard.
   * @returns {String|null} The text of the license, or null if it's invalid.
   */
  function getLicense (name) {
    if (!isLicenseValid(name)) {
      return null;
    }
    return licenseCache[name];
  }

  module.exports = {
    'getLicense': getLicense,
    'isLicenseValid': isLicenseValid
  };

})();
