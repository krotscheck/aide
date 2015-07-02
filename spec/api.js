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

describe('Unit: Root API', function () {
  'use strict';

  var api = require('../aide');
  var licences = require('../lib/licences');
  var commands = require('../lib/commands');

  it('Should contain the licences package.', function () {
    expect(api.licences).toEqual(licences);
  });

  it('Should contain the commands package.', function () {
    expect(api.commands).toEqual(commands);
  });
});
