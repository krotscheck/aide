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

  var nopt = require('nopt');
  var fs = require('fs');
  var path = require('path');

  var knownOpts = {
    'version': Boolean,
    'package': String
  };

  var shortHands = {
    'v': ['--version'],
    'p': ['--package']
  };

  /**
   * Extracts the --version parameter from the passed commandline options.
   *
   * @param {{}} opts Options hash received from nopt.
   * @returns {Boolean} True if --version is set, otherwise false.
   */
  function extractVersion (opts) {
    return opts.version || false;
  }

  /**
   * Extract the path to the package.json file that we're running against.
   *
   * @param {{}} opts Options hash received from nopt.
   * @returns {String} Path to the package.json file.
   */
  function extractPackage (opts) {
    var requested = opts.package || process.cwd() + '/package.json';

    var stats = fs.statSync(requested);
    if (stats.isDirectory()) {
      requested = path.join(requested, 'package.json');
      // Try to resolve stats again, this will throw an error if the file does not exist.
    }

    // Try to open the file. This acts as a redundant file-not-found and permissions check.
    fs.readFileSync(requested);

    return path.resolve(requested);
  }

  /**
   * Parse the nopts array, and return a hash with all the expected parameters.
   *
   * @returns {{version: Boolean, package: String}} The application argument hash.
   */
  function parseResults () {
    var parsed = nopt(knownOpts, shortHands, process.argv, 2);

    // Return all the expected version items.
    return {
      'version': extractVersion(parsed),
      'package': extractPackage(parsed)
    };
  }

  module.exports = {
    'parse': parseResults
  };
})();
