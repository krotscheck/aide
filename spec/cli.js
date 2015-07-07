/*
 * Copyright 2015 Michael Krotscheck
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

describe('Unit: CLI Execution Tests', function () {
  'use strict';

  // Ensure that bootstrap is setup properly.
  require('./helpers/argv').initialize();

  var cli = require('../lib/cli');
  var commands = require('../lib/commands');
  var stdout = require('./helpers/stdout');
  var output;

  beforeEach(function () {
    output = [];
    stdout.capture(function capture (buffer) {
      output.push(buffer);
    });

    // Spyon exit, make sure it doesn't get called.
    spyOn(process, 'exit');
  });

  afterEach(function () {
    stdout.clear();
  });

  it('Should exit cleanly with no options.', function () {
    // Run the test.
    cli.execute();
    expect(output.length).toEqual(0);
  });

  it('Should output the correct version.', function () {
    // Setup argv
    process.argv.push('--version');

    // Run the test.
    cli.execute();
    expect(output[0]).toEqual(commands.getVersion());
    expect(process.exit).toHaveBeenCalled();
  });

});
