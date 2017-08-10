const generators = require('../../built-ins/generators');
const parsers = require('../../built-ins/parsers');
const printers = require('../../built-ins/printers');
const fs = require('fs');
const ui = require('../../../lib/UI');

let def = {
    name: "proptojson",
    source: __dirname,
    validoptions: {
        input: true,
        output: false,
        dependency: {
            1: parsers.jsonparser,
            2: generators.json,
            3: printers.json
        },
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
	let date = new Date();
        opts.input = '/media/docsys/uptake/' + opts.input;
        if (!opts.hasOwnProperty("output")) {
            opts.output = "/media/docsys/artifacts/" + date.getYear() + date.getMonth() + date.getDay() + Math.random() + ".json"; //set default
        } else {
	    opts.output = "/media/docsys/artifacts/" + opts.output + ".json";
	}
        generators.json.link({input: opts.input, output: opts.output, callback:function(){
            fs.readFile(opts.output, function(err, data){
                if(err){
		    ui.controller.messageAppendError(err.toString());
		}
		data = data.toString();
                //data = data.replace(/,/g, ",\n");
                printers.json.link({input: data, callback: function(result){
                    fs.writeFile(opts.output, result, function(){
                        console.log("wrote");
                    });
                }});
            });
        }});
    },
    sub: function (opts) {
        console.log(opts.payload);
    }
};

exports.def = def;
