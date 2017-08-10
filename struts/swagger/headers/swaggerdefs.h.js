/**
 * Created by scolsen on 4/14/2017.
 */
const swagger = require('../index');
const parsers = require('../../built-ins/parsers');
const fs = require('fs');
const ui = require('../../../lib/UI');

function swaggerDefs (data){
    let defs = "";
    let date = new Date();
    let o = chainOpts();
    let oloc = "";
    if(o.output){
        oloc  = "/media/docsys/artifacts/" + o.output + ".txt";
    } else {
        oloc = "/media/docsys/artifacts/" + date.getFullYear() + date.getMonth() + date.getDay() + Math.random() + "-tags.txt";
    }
    console.log(data);
    for (let k in data.definitions) {
        if (data.defintions.hasOwnProperty(k)) {
            defs = defs + "entity" + k + " | " + "\n";
        }
    }
    // ui.controller.messageAppend(tags);
    fs.writeFileSync(oloc, defs);
    ui.controller.messageAppend("Wrote output to: ", oloc);
}

function process(opts){
    parsers.jsonparser.link(opts)
        .chain(swaggerDefs)();
}

function processUrl(opts){
    opts.callback = swaggerDefs;
    parsers.jsonparser.link(opts);
}

let def = {
    name: "swaggertags",
    source: __dirname,
    validoptions: {
        input: false,
        output: false,
        callback: false,
        dependency: {
            proc: parsers.jsonparser,
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
        return swaggerDefs(data)();
    }
};

exports.def = def;
