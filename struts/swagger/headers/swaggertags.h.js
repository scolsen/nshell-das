const swagger = require('../index');
const parsers = require('../../built-ins/parsers');
const fs = require('fs');
const ui = require('../../../lib/UI');

function _swaggerTags (data){
    let tags = "";
    let date = new Date();
    let o = chainOpts();
    let oloc = "";
    if(o.output){
	oloc  = "/media/docsys/artifacts/" + o.output + ".txt";
    } else {
	oloc = "/media/docsys/artifacts/" + date.getFullYear() + date.getMonth() + date.getDay() + Math.random() + "-tags.txt";
    }
        console.log(data);
        for (let k in data.tags) {
            if (data.tags.hasOwnProperty(k)) {
                tags = tags + data.tags[k].name + " | " + data.tags[k].description + "\n";
            }
        }
      // ui.controller.messageAppend(tags);
    fs.writeFileSync(oloc, tags);
    ui.controller.messageAppend("Wrote output to: ", oloc);
}

function process(opts){
    parsers.jsonparser.link(opts)
    .chain(_swaggerTags)();
}

function processUrl(opts){
    opts.callback = _swaggerTags;
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
        return _swaggerTags(data)();
    }
};

exports.def = def;
