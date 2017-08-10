/**
 * Created by scolsen on 2/13/17.
 */
const h = require('./headers/index');
const htmlgenerator = new bigshell.core.proc(h.htmlgenerator);
const jsongenerator = new bigshell.core.proc(h.jsongenerator);
const propertiesgenerator = new bigshell.core.proc(h.propertiesgenerator);

exports.htmlgenerator = htmlgenerator;
exports.jsongenerator = jsongenerator;
exports.propertiesgenerator = propertiesgenerator;