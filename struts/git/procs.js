/**
 * Created by scolsen on 2/23/17.
 */
const git = require('./index');

const procs = {
    "gitstatus" : git.status,
    "gitdiff" : git.diff
};

exports.procs = procs;