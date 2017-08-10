/**
 * Created by scolsen on 2/14/17.
 */
const git = require('./git');

exports.status = git.gitstatus;
exports.diff = git.gitdiff;