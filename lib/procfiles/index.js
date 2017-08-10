/**
 * Created by scolsen on 2/15/17.
 *
 */
const config = require('../../config');
const coreP = require('../procs');

let procMonolith= {};

//!auto add core processes to the monolith.!
for (let k in coreP.procs){
    if(coreP.procs.hasOwnProperty(k)){
        procMonolith[k] = coreP.procs[k];
    }
}

//include everything set in config struts object.
for (let k in config.struts){
        if(config.struts.hasOwnProperty(k)) {
            for(let i in config.struts[k].procs){
                if(config.struts[k].procs.hasOwnProperty(i)){
                    procMonolith[i] = config.struts[k].procs[i];
                }
            }
        }
}

exports.procs = procMonolith;