/**
 * Created by scolsen on 2/10/17.
 */
const swagger = require('./swagger');

exports.reader = swagger.swaggerreader;
exports.endpoints = swagger.swaggerendpoints;
exports.tags = swagger.swaggertags;
exports.info = swagger.swaggerinfo;
exports.defs = swagger.swaggerdefs;