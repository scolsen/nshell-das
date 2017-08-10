/**
 * Created by scolsen on 2/14/17.
 */
const h = require('./headers');

const proclist = new bigshell.core.proc(h.proclist);

exports.proclist = proclist;