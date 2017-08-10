/**
 * Created by scolsen on 2/15/17.
 */
const proptojson = require('./proptojson.h');
const updatepropsfromjson = require('./updatepropsfromjson.h');
const wsdl = require('./wsdl.h');
const wsdldiff = require('./wsdldiff.h');
const appendjsontoprop = require('./appendjsontoprop.h');

exports.proptojson = proptojson.def;
exports.updatepropsfromjson = updatepropsfromjson.def;
exports.wsdl = wsdl.def;
exports.wsdldiff = wsdldiff.def;
exports.appendjsontoprop = appendjsontoprop.def;