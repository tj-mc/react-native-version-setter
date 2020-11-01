"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cliArgumentExists = exports.die = exports.out = void 0;

var out = function out(message) {
  console.log("[RNVS] ".concat(message));
};

exports.out = out;

var die = function die(message) {
  out(message);
  process.exit(1);
};

exports.die = die;

var cliArgumentExists = function cliArgumentExists(flag) {
  process.argv.find(function (arg) {
    return arg === flag;
  });
};

exports.cliArgumentExists = cliArgumentExists;