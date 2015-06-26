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

  module.exports = {
    'isLicenseValid': isLicenseValid
  };

})();
