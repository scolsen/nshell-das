const parsers = require('../../../built-ins/parsers');
const fs = require('fs');

let def = {
    name: "propertiesgenerator",
    source: __dirname,
    validoptions: {
        input: true,
        output: false,
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
    help: function () {
        bigshell.core.help.link({helpfile: def.name, target: 'main'});
    },
    exitOnError: true,
    main: function (opts) {
        if(!opts.hasOwnProperty("output")){opts.output = "/home/scolsen/file.properties"}
        let data = "";
        if(opts.input.match(/.*.json/)){
            //use properties parser.
            let parsed = parsers.jsonparser.link({input: opts.input, mode: "jin"});
            for (let k in parsed){
                data = data + k;
                data = data + "=";
                data = data + parsed[k];
                data = data + "\n";
            }
            console.log(data);
            fs.writeFileSync(opts.output, data.toString());
        }
    },
    sub: function (opts) {
        if(!opts.hasOwnProperty("output")){opts.output = "/home/scolsen/file.properties"}
        let data = "";
        if(opts.input.match(/.*.json/)){
            //use properties parser.
            let parsed = parsers.jsonparser.link({input: opts.input, mode: "jin"});
            for (let k in parsed){
                data = data + k;
                data = data + " = ";
                data = data + parsed[k];
                data = data + "\n";
            }
            console.log(data);
            fs.writeFileSync(opts.output, data.toString());
        }
        console.log(opts.payload);
    }
};

exports.def = def;