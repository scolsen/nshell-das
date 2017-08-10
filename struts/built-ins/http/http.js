/**
 * Created by scolsen on 3/1/17.
 */
const h = require('./headers/index');

let request = new bigshell.core.proc(h.request);

exports.request = request;