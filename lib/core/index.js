//require all core modules.
const errors = require('./errors');
const callstack = require('./callstack');
const optvalidator = require('./optvalidator');
const helprender = require('./helprender');
const proc = require('./proc');
const core = require('./core');
const ShellInterface = require('./shellinterface');

exports.proc = proc.Proc;
exports.errors = errors;
exports.callstack = callstack;
exports.optvalidator = optvalidator;
exports.help = helprender;
exports.exit=core.exit;
exports.struts=core.struts;
exports.ShellInterface=ShellInterface.ShellInterface;
exports.os=core.os;