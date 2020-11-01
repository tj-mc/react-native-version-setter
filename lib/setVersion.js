#!/usr/bin/env node
"use strict";

var _process = require("./process.js");

var _emoji = require("./emoji.js");

var _readPackageJson = require("./readPackageJson.js");

var _createLocations = require("./createLocations.js");

var replace = require('replace-in-file');

var packageJson = (0, _readPackageJson.readPackageJson)();
packageJson || (0, _process.die)('Could not read package.json.');
/**
 * All possible command line flags
 */

var commandLineFlags = [{
  name: 'debugLog',
  argument: '-d',
  set: false
}];
/**
 * Loop through the commandLineFlags array,
 * searching for a symbol in the command line
 * call
 */

commandLineFlags.forEach(function (flag) {
  flag.set = (0, _process.cliArgumentExists)(flag.argument);
});
/**
 * Check for valid version strings.
 */

var version = {
  validRegEx: /^[0-9, .]+[0-9]+$/,
  // Test to validate version strings
  // Cannot end or start with .
  // Must be only digit and .
  raw: process.argv[2] // The raw input version string

};
/**
 * Error messages
 */

version.raw || (0, _process.die)("Please provide a version number. ".concat(_emoji.emoji.warning));
version.validRegEx.test(version.raw) || (0, _process.die)("Your version number should contain only digits and periods. ".concat(_emoji.emoji.warning, " "));
version.stripped = version.raw.split('.').join('');
var locations = (0, _createLocations.createLocations)(version, packageJson);
var changes = 0;

try {
  locations.forEach(function (location) {
    var _result$, _result$2;

    var result = replace.sync(location);
    ((_result$ = result[0]) === null || _result$ === void 0 ? void 0 : _result$.file) || (0, _process.out)("Could not find file: ".concat(location.files, " ").concat(_emoji.emoji.warning, " "));

    if ((_result$2 = result[0]) === null || _result$2 === void 0 ? void 0 : _result$2.hasChanged) {
      changes++;
      commandLineFlags.debugLog.set && (0, _process.out)("Set ".concat(location.files, " to:  ").concat(location.to, " "));
    } else {
      commandLineFlags.debugLog.set && (0, _process.out)("".concat(location.files, " was not changed."));
    }
  });

  if (locations.length > changes && changes !== 0) {
    (0, _process.out)("One or more files were not changed. Run with -d flag for debug log. ".concat(_emoji.emoji.warning));
  } else if (changes === 0) {
    if (packageJson.version === version.raw) {
      (0, _process.out)("Version is already ".concat(version.raw, " ").concat(_emoji.emoji.warning, "  "));
    } else {
      (0, _process.out)("No files changed. Run with -d flag for debug log. ".concat(_emoji.emoji.warning, " "));
    }
  } else if (changes === locations.length) {
    (0, _process.out)("".concat(packageJson.name, ": ").concat(packageJson.version, ": ==> ").concat(version.raw, " ").concat(_emoji.emoji.check, " "));
  }
} catch (e) {
  (0, _process.die)(e);
}