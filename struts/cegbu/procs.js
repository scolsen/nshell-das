/**
 * Created by scolsen on 2/15/17.
 */
const cegbu = require('./index');

let procs = {
    "proptojson": cegbu.proptojson,
    "update": cegbu.updatepropsfromjson,
    "wsdl" : cegbu.wsdl,
    "wsdldiff" : cegbu.wsdldiff,
    "append": cegbu.appendjsontoprop
};

exports.procs = procs;