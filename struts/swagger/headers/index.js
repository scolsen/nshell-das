/**
 * Created by scolsen on 2/10/17.
 */
const swaggerreader = require('./swaggerreader.h.js');
const swaggerendpoints = require('./swaggerendpoints.h.js');
const swaggertags = require('./swaggertags.h.js');
const swaggerinfo = require('./swaggerinfo.h');
const swaggerdefs = require('./swaggerdefs.h');

exports.swaggerreader = swaggerreader.def;
exports.swaggerendpoints = swaggerendpoints.def;
exports.swaggertags = swaggertags.def;
exports.swaggerinfo = swaggerinfo.def;
exports.swaggerdefs = swaggerdefs.def;