/**
 * Created by scolsen on 2/15/17.
 */
const h = require('./headers');

const proptojson = new bigshell.core.proc(h.proptojson);
const updatepropsfromjson = new bigshell.core.proc(h.updatepropsfromjson);
const wsdl = new bigshell.core.proc(h.wsdl);
const wsdldiff = new bigshell.core.proc(h.wsdldiff);
const appendjsontoprop = new bigshell.core.proc(h.appendjsontoprop);

exports.proptojson = proptojson;
exports.updatepropsfromjson = updatepropsfromjson;
exports.wsdl = wsdl;
exports.wsdldiff = wsdldiff;
exports.appendjsontoprop = appendjsontoprop;