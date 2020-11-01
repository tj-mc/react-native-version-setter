"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.readPackageJson = void 0;

var fs = require('fs');

var readPackageJson = function readPackageJson() {
  var packageJson;

  try {
    packageJson = JSON.parse(String(fs.readFileSync('package.json')));

    if (packageJson) {
      return packageJson;
    }
  } catch (e) {
    return null;
  }
};

exports.readPackageJson = readPackageJson;