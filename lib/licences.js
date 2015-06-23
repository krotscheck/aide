(function () {
  'use strict';

  var spdx = require('spdx-license-list/spdx-full');

  /**
   * Assert that the passed license name matches the SPDX name.
   *
   * @param {String} name The name of the license.
   * @returns {boolean} True if valid, otherwise false.
   */
  function isLicenseValid (name) {
    return spdx.hasOwnProperty(name);
  }

  module.exports = {
    'isLicenseValid': isLicenseValid
  };

})();
