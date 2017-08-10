/**
 * Created by scolsen on 2/9/17.
 */
const callstack = require('./callstack');
const parsers = require('.././parsers');

function readNsh(nshfile){
    let inp = parsers.nshparser.link({input: nshfile, mode: "jin"});
    console.log(parsers.nshparser);
    console.log( "inp:", inp);
    console.log(callstack.contents);
}

exports.readNsh = readNsh;