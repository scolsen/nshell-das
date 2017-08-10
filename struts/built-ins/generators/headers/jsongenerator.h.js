/**
 * Input must be resolved into a javascript object.
 */
const parsers = require('../../parsers/index');
const fs = require('fs');

function generateJson(opts, data){
        console.log(arguments);
        let json;
        let out = opts.output;
        json = JSON.stringify(data);
        if(opts.output){
            fs.writeFileSync(opts.output, json);
            bigshell.ui.controller.messageAppend("Wrote json to ", out);
        }
        return chainable(data);
   }

function wrap(opts, data){
        generateJson(opts, data)
            .chain(chainTest)();
}

let def = {
    name: "jsongenerator",
    source: __dirname,
    validoptions: {
        input: true,
        output: false,
        dependency: {
            proc: parsers.propertiesparser
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
        if(opts.input.match(/.*.properties/)){
            parsers.propertiesparser.link({input: opts.input, output: opts.output, callback: wrap});
        } else if (opts.input.match(/.*.txt/)){
            parsers.textparser.link({input: opts.input, output: opts.output, callback: wrap});
        }
    },
    sub: function (opts) {
        if(opts.input.match(/.*.properties/)){
            parsers.propertiesparser.link({input: opts.input, output: opts.output, callback: wrap});
        } else if (opts.input.match(/.*.txt/)){
            parsers.textparser.link({input: opts.input, output: opts.output, callback: wrap});
        }
    }
};

exports.def = def;