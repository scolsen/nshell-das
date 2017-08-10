/**
 * Created by scolsen on 2/15/17.
 * Process definitions for the swagger module
 */
const swagger = require('./index');
let procs = {
    "swaggerreader": swagger.reader,
    "swaggerendpoints": swagger.endpoints,
    "swaggertags": swagger.tags,
    "swaggerinfo": swagger.info,
    "swaggerdefs": swagger.defs
};

exports.procs = procs;