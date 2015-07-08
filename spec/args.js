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

  // Ensure that bootstrap is setup properly.
  require('./helpers/argv').initialize();

  var fs = require('fs');
  var args = require('../lib/args');

  it('Should recognize --version as the version flag.', function () {
    process.argv.push('--version');

    var processed = args.parse();
    expect(processed.version).toEqual(true);
  });

  it('Should recognize -v as the version flag.', function () {
    process.argv.push('-v');

    var processed = args.parse();
    expect(processed.version).toEqual(true);
  });

  it('Should recognize --package as the package flag.', function () {
    process.argv.push('--package=./package.json');

    var processed = args.parse();
    expect(processed.package).toEqual(process.cwd() + '/package.json');
  });

  it('Should recognize -p as the package flag.', function () {
    process.argv.push('-p=./package.json');

    var processed = args.parse();
    expect(processed.package).toEqual(process.cwd() + '/package.json');
  });

  it('Should attempt to resolve package.json if passed a directory.', function () {
    process.argv.push('-p=.');

    var processed = args.parse();
    expect(processed.package).toEqual(process.cwd() + '/package.json');
  });

  it('Should error if -p does not point to a valid folder.', function () {
    process.argv.push('-p=/tmp');

    expect(args.parse).toThrow();
  });

  it('Should error if -p does not point to a valid package.', function () {
    process.argv.push('-p=/tmp/package.json');
    expect(args.parse).toThrow();
  });

  it('Should error if -p points at a file that is not readable.', function () {

    // Create an unreadable file.
    var filePath = '/tmp/package.json';
    fs.closeSync(fs.openSync(filePath, 'w'));
    fs.chmodSync(filePath, '0000');

    process.argv.push('-p=/tmp/package.json');
    expect(args.parse).toThrow();

    // Cleanup.
    fs.chmodSync(filePath, '7777');
    fs.unlink(filePath);
  });
});
