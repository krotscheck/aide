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

  var callbacks = [];
  var oldWrite = process.stdout.write;

  process.stdout.write = function (output) {
    oldWrite.apply(process.stdout, arguments);
    for (var i = 0; i < callbacks.length; i++) {
      var cb = callbacks[i];
      cb(output.trim());
    }
  };

  /**
   * Pass all of the output to stdout to the provided callback method.
   *
   * @param {function} cb The callback method to invoke.
   * @returns {void}
   */
  function capture (cb) {
    callbacks.push(cb);
  }

  /**
   * Clear all callback methods.
   *
   * @returns {void}
   */
  function clear () {
    callbacks = [];
  }

  module.exports = {
    'capture': capture,
    'clear': clear
  };
})();
