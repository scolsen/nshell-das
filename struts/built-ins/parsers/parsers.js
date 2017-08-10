/**
 * Created by scolsen on 2/7/17.
 * jsonparser
 * responsible for reading json and storing as object
 * Or for converting object to json.
 * input(required): the json file, json data, or js object to read.
 *  <jsonliteral> literal json to process
 *  <jsonfile> json file to process
 * output(optional): the file location to save output to.
 * mode(required): the mode to run, determines what function this process calls.
 *  jout | out: save data as json.
 *  jin | in: read data as json.
 * returns parsed json for mode in. returns stringified json for mode out.
 */
const h = require('./headers/index');
const jsonparser = new bigshell.core.proc(h.jsonparser);
const nshparser  = new bigshell.core.proc(h.nshparser);
const propertiesparser = new bigshell.core.proc(h.propertiesparser);
const textparser = new bigshell.core.proc(h.textparser);
exports.jsonparser = jsonparser;
exports.nshparser = nshparser;
exports.propertiesparser = propertiesparser;
exports.textparser = textparser;