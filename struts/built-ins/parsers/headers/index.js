/**
 * Created by scolsen on 2/9/17.
 */
const jsonparser = require('./jsonparser.h.js');
const nshparser = require('./nshparser.h.js');
const propertiesparser = require('./propertiesparser.h.js');
const textparser = require('./textparser.h.js');

exports.jsonparser = jsonparser.def;
exports.nshparser = nshparser.def;
exports.propertiesparser = propertiesparser.def;
exports.textparser = textparser.def;