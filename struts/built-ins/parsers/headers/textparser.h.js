/**
 * Created by scolsen on 4/7/2017.
 * Parse a text file line by line.
 * Each \n is read as a new object value.
 */
const fs = require('fs');
const readline = require('readline');
const ui = require('../../../../lib/UI');

function parseText(data){
    let d = data;
    if(!data.input.match(/.*.txt/)){ //check that input is properties.
        ui.controller.messageAppendError("Error file is not a txt file");
    }
    let text = {}; //initialize empty object to store values.
    let rl = readline.createInterface({
        input: fs.createReadStream(data.input)
    });

    rl.on('line', function(line){
        if(line === ""){
            //blank line. Skip.
        } else {
            let kV = line;
            text[kV] = "Placeholder";
        }
    });

    rl.on('error', function(){
        ui.controller.messageAppendError("Error reading file");
    });

    rl.on('close', function(){
        console.log(text);
        data.callback(d, text);
    });
}

let def = {
    name: "textparser",
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
        parseText(opts);
    },
    sub: function (opts) {
        return parseText(opts);
    }
};

exports.def = def;