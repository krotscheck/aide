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
