/**
 * Created by scolsen on 2/16/17.
 */
const h = require('./headers');

let prettyjson = new bigshell.core.proc(h.prettyjson);

exports.prettyjson = prettyjson;