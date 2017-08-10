/**
 * Returns JS object of property file contents preserving key/val pairs.
 */
const fs = require('fs');
const readline = require('readline');
const ui = require('../../../../lib/UI');

function parseProperties(data){
    //return object mirroring property file key:value
    //check that input is properties.
    let d = data;
    if(!data.input.match(/.*.properties/)){
        //throw error. Quit.
    }
    let properties = {}; //initialize empty object to store values.
    let rl = readline.createInterface({
        input: fs.createReadStream(data.input)
    });
    rl.on('line', function(line){
        if(line === ""){
            //blank line. Skip.
        } else if (line.match(/^#.*/)){
            //Line is a comment. Skip.
        } else {
            let kV;
            line = line.replace(/"/g, ""); //replace quotes
            if(line.match(/=/) !== null){
                kV = line.split("=", 2); //limit split to one to split only at first instance of '=' or ':'
            } else {
                kV = line.split(":", 2); //if = is not used assume :
            }
            let k = kV[0];
            properties[k] = kV[1];
        }
    });

    rl.on('error', function(){
	ui.controller.messageAppendError("Error reading file");
    });

    rl.on('close', function(){
        console.log(properties);
        data.callback(d, properties);
    });

}

let def = {
    name: "propertiesparser",
    source: __dirname,
    validoptions: {
        input: true,
        callback: false
    },
    linkable: true,
    sync: true,
    prompt: false,
    errors: {
        errorName: {
            name: "",
            message: "",
            cause: "",
            resolution: ""
        }
    },
    //help: bigshell.help.renderhelp,
    exitOnError: false,
    main: function (opts) {
        parseProperties(opts);
    },
    sub: function (opts) {
        return parseProperties(opts);
    }
};

exports.def = def;
