/**
 * Created by scolsen on 2/15/17.
 */
const filesystem = require('./file-system/index');
const parsers = require('./parsers/index');
const shell = require('./shell/index');
const generators = require('./generators/index');
const printers = require('./printers/index');
const http  = require('./http');
const util = require('./util');
const procs = {
   // "ls" : filesystem.ls,
   // "mkdir" : filesystem.mkdir,
    "jsonparser" : parsers.jsonparser,
   // "nshparser" : parsers.nshparser,
    "propertiesparser": parsers.propertiesparser,
   // "touch" : filesystem.touch,
   // "sh" : shell.sh,
    "htmlgenerator": generators.html,
    "jsongenerator": generators.json,
    "propertiesgenerator": generators.properties,
    "prettyjson": printers.json,
    "httprequest": http.request,
    "proclist": util.proclist,
    "menu": util.proclist
};

exports.procs = procs;
