/**
 * Created by scolsen on 2/14/17.
 */
const h = require('./headers');
const gitstatus = new bigshell.core.proc(h.gitstatus);
const gitdiff = new bigshell.core.proc(h.gitdiff);

exports.gitstatus = gitstatus;
exports.gitdiff = gitdiff;