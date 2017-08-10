/**
 * Created by scolsen on 2/7/17.
 * contains specifications for all processes defined in parsers.
 * jsonparser
 * responsible for reading json and storing as object
 * Or for converting object to json.
 * input(required): the json file, json data, or js object to read.
 *  <jsonliteral> literal json to process
 *  <jsonfile> json file to process
 * returns parsed json for mode in. returns stringified json for mode out.
 */
//TODO: Make file r/w strategy consistent--sync or async.
const config =require('../../../../config');
const fs = require('fs');
const http = require('../../../built-ins/http');

function parseFromUrl (data){
    return chainable(JSON.parse(data));
}

function parseJson(opts){
    if(opts.input.match(/.*.json/)){
	opts.input = "/media/docsys/uptake/" + opts.input;
        let json = fs.readFileSync(opts.input);
        return chainable(JSON.parse(json));
    } else {
        let json;
        let inp = opts.input + ".json"; //if arg has no .json, append as ext and try opening.
        try {
            json = fs.readFileSync(inp);
        } catch (err) {
            //if no file is found, try reading the input as json literal.
            let json = JSON.stringify(opts.input); //ensure our input is formatted as JSON.
            return chainable(JSON.parse(json));
        }
    }
}

let def = {
    name: "jsonparser",
    source : __dirname,
    validoptions : {
            input: false,
            url: false,
            dependency: {
                1: http.request,
            }
        },
    errors : {
        fileReadError: {
            name: "jsonparser file read error",
            message: "could not parse json file",
            cause: "jsonparser was unable to read the specified input or the file was not found",
            resolution: "call jsonparser with input set to a .json file or literal json."
        }
    },
    linkable: true,
    sync: true,
    prompt: false,
    //help : bigshell.help.renderhelp,
    exitOnError: false,
    main : function main(opts){
        if (opts.hasOwnProperty("url") && opts.path != undefined){
            opts.input = opts.path;
            http.request.main({hostname: opts.hostname, path: opts.path, port: 80}, parseFromUrl);
        } else {
            parseJson(opts);
        }
    },
    sub: function(opts) {
        console.log(opts);
        if (opts.hasOwnProperty("url") && opts.path != undefined){
            opts.input = opts.path;
            return http.request.link({hostname: opts.hostname, path: opts.path, port: 80, callback: function(data){parseFromUrl(data).chain(opts.callback)();}});
        } else {
            return parseJson(opts);
        }
    }
};

exports.def = def;
