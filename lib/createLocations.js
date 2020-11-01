"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createLocations = void 0;

var _constants = require("./constants.js");

var createLocations = function createLocations(version, packageJson) {
  var platform = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var allLocations = [{
    files: './android/app/build.gradle',
    from: new RegExp('versionCode [0-9]+', 'g'),
    to: "versionCode ".concat(version.stripped),
    platform: _constants.constants.platform.android
  }, {
    files: './android/app/build.gradle',
    from: new RegExp('versionName "[0-9, .]+"', 'g'),
    to: "versionName \"".concat(version.raw, "\""),
    platform: _constants.constants.platform.android
  }, {
    files: "./ios/".concat(packageJson.name, ".xcodeproj/project.pbxproj"),
    from: new RegExp('MARKETING_VERSION = [0-9, .]+', 'g'),
    to: "MARKETING_VERSION = ".concat(version.raw),
    platform: _constants.constants.platform.ios
  }, {
    files: "./package.json",
    from: new RegExp('"version": ".+"'),
    to: "\"version\": \"".concat(version.raw, "\""),
    platform: _constants.constants.platform.universal
  }];
  /**
   * If a platform was passed, find the locations for that platform.
   */

  switch (platform) {
    case _constants.constants.platform.android:
      return allLocations.filter(function (location) {
        return location.platform === _constants.constants.platform.android;
      });

    case _constants.constants.platform.ios:
      return allLocations.filter(function (location) {
        return location.platform === _constants.constants.platform.ios;
      });

    default:
      return allLocations;
  }
};

exports.createLocations = createLocations;