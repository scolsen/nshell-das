/**
 * Created by scolsen on 2/9/17.
 */
const shellcom = require('./proc');
const h = require('./headers/index');

const exit = new shellcom.Proc(h.exit);
const struts = new shellcom.Proc(h.struts);
const os  = new shellcom.Proc(h.os);

exports.exit = exit;
exports.struts = struts;
exports.os = os;