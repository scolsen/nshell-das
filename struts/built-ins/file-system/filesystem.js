const h = require('./headers/index');

let ls = new bigshell.core.proc(h.ls);
let mkdir = new bigshell.core.proc(h.mkdir);
let touch = new bigshell.core.proc(h.touch);

exports.mkdir = mkdir;
exports.touch = touch;
exports.ls = ls;