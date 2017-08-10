/**
 * Created by scolsen on 2/9/17.
 * file-system header index.
 * Imports all file-system header definitions.
 */
const ls = require('./ls.h.js');
const mkdir = require('./mkdir.h.js');
const touch = require('./touch.h.js');

exports.ls = ls.def;
exports.mkdir = mkdir.def;
exports.touch = touch.def;