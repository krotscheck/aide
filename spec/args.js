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

describe('Unit: CLI Args', function () {
  'use strict';

  var oldargs;

  beforeEach(function () {
    oldargs = process.argv;
    process.argv = oldargs.slice(0);
  });

  afterEach(function () {
    process.argv = oldargs;
  });

  var args = require('../lib/args');

  it('Should recognize --version as the version flag.', function () {
    process.argv.push('--version');

    var processed = args.parse();
    expect(processed.version).toEqual(true);
  });

  it('Should recognize --v as the version flag.', function () {
    process.argv.push('--v');

    var processed = args.parse();
    expect(processed.version).toEqual(true);
  });
});
