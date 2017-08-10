const parsers= require('../../built-ins/parsers');
const fs = require('fs');
const ui = require('../../../lib/UI');

function endGen (data){
    let date = new Date();
    let oloc = "";
    let o = chainOpts();
    let endpoints = "";
    let title = data.info.title;
    if (!o.hasOwnProperty("output")){
	    oloc = "/media/docsys/artifacts/" + date.getYear() + date.getMonth() + date.getDay() + Math.random() + title + "-endpoints.txt";
    } else {
        oloc = "/media/docsys/artifacts/" + o.output + "-endpoints.txt";
    }

    if(o.details){
        for (let k in data.paths){
            endpoints = endpoints + k + "\n" + "Operations:";
            for(let i in data.paths[k]){
                endpoints = endpoints + "\t" + "\n" + i + "\n";
                for(let j in data.paths[k][i]){
                    if(data.paths[k][i].hasOwnProperty(j)){
                        if(j === "parameters"){
                            endpoints = endpoints + "\t" + data.paths[k][i][j] + "\n";
                            for (let s in data.paths[k][i][j]){
                                for (let h in data.paths[k][i][j][s]) {
                                    endpoints = endpoints + "\t" + h + " " +  data.paths[k][i][j][s][h] + "\n";
                                }
                            }
                        }
                    }
                }
            }
        }
    } else {
        for (let k in data.paths) {
            endpoints = endpoints + k + "\n";
        }
    }

    fs.writeFileSync(oloc, endpoints);
	ui.controller.messageAppend("Wrote output to: ", oloc);
}

function process(opts){
    parsers.jsonparser.link(opts)
        .chain(endGen)();
}

function processUrl(opts){
    opts.callback = endGen;
    parsers.jsonparser.link(opts);
}

let def = {
    name: "swaggerendpoints",
    source: __dirname,
    validoptions: {
        input: false,
        output: false,
        details: false,
        dependency: {
            1: parsers.jsonparser,
        }
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
    help: bigshell.core.help.renderhelp,
    exitOnError: false,
    main: function (opts) {
        if(opts.hasOwnProperty("url")){
            processUrl(opts);
        } else {
            process(opts);
        }
    },
    sub: function (data) {
        return endGen(data);
    }
};

exports.def = def;