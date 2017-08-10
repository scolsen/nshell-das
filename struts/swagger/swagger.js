/**
 * Created by scolsen on 2/10/17.
 */
const h = require('./headers/index');

const swaggerreader = new bigshell.core.proc(h.swaggerreader);
const swaggerendpoints = new bigshell.core.proc(h.swaggerendpoints);
const swaggertags = new bigshell.core.proc(h.swaggertags);
const swaggerinfo = new bigshell.core.proc(h.swaggerinfo);
const swaggerdefs = new bigshell.core.proc(h.swaggerdefs);

exports.swaggerreader = swaggerreader;
exports.swaggerendpoints = swaggerendpoints;
exports.swaggertags = swaggertags;
exports.swaggerinfo = swaggerinfo;
exports.swaggerdefs = swaggerdefs;