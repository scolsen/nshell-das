
const h = require('./headers/index');
const sh = new bigshell.core.proc(h.sh);
exports.sh = sh;