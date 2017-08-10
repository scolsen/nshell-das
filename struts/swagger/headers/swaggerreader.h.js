const parsers = require('../../built-ins/parsers');

function readSwagger(data){
    console.log("Swagger Version:", data.swagger);
    console.log("Swagger info:", data.info);
    console.log("Swagger basePath:", data.basePath);
    console.log("Swagger tags:", data.tags);
    console.log("Swagger schemes:", data.schemes);
    console.log("Swagger paths:", data.paths);
    console.log("Swagger definitions:", data.definitions);
    return chainable(data); //ALL chainable data must be wrapped in chainable.
}

let def = {
    name: "swaggerreader",
    source: __dirname,
    validoptions: {
        input: false,
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
        if (opts.hasOwnProperty("url")){
            opts.callback = readSwagger;
            parsers.jsonparser.link(opts);
        } else {
            parsers.jsonparser.link(opts)
                .chain(readSwagger)();
        }

    },
    sub: function(data) {
        return readSwagger(data); //If chainable, must return the function
    } //chainable links do not auto run, aka, do not (); And must be passed data
};

exports.def = def;