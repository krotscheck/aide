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

  var args = require('./args');
  var commands = require('./commands');

  /**
   * Parse the commandline arguments, and execute the appropriate method.
   *
   * @returns {*} Variable, depending on action.
   */
  function execute () {
    var options = args.parse();

    // Handle the --version flag.
    if (options.version) {
      process.stdout.write(commands.getVersion() + '\n');
      /*eslint-disable no-process-exit */
      process.exit();
      /*eslint-enable no-process-exit */
    }
  }

  module.exports = {
    'execute': execute
  };
})();
