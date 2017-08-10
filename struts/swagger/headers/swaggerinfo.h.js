const swagger = require('../index');
const parsers = require('../../built-ins/parsers');
const fs = require('fs');

function getInfo(data){
    let info = "";
    opts = chainOpts();
    for (let k in data.info){
        if(data.info.hasOwnProperty(k)) {
            info = info + k + " | " + data.info[k] + "\n";
        } else {
            console.log("Not a validly formed swagger file. Recieved: ", data);
        }
    }
    console.log("info", info);
    if(opts.output){
        fs.writeFileSync(opts.output, info);
    }
    return chainable(info);
}

function process (opts){
    parsers.jsonparser.link(opts)
        .chain(getInfo)();
}

function processURL (opts){
    opts.callback = getInfo;
    parsers.jsonparser.link(opts);
}

let def = {
    name: "swaggerinfo",
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
    help: function () {
        bigshell.core.help.link({helpfile: def.name, target: 'main'});
    },
    exitOnError: true,
    main: function (opts) {
        if(opts.hasOwnProperty("url")){
            processURL(opts);
        } else {
            process(opts);
        }
    },
    sub: function (opts) {

    }
};

exports.def = def;