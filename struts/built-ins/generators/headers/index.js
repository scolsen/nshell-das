/**
 * Created by scolsen on 2/13/17.
 */

const htmlgenerator = require('./htmlgenerator.h.js');
const jsongenerator = require('./jsongenerator.h.js');
const propertiesgenerator = require('./propertiesgenerator.h');

exports.htmlgenerator = htmlgenerator.def;
exports.jsongenerator = jsongenerator.def;
exports.propertiesgenerator = propertiesgenerator.def;