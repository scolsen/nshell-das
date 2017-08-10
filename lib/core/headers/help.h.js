const shellcom = require('../../core');
const generators = require('../../../struts/built-ins/generators/index');
const fs = require('fs');

let def = {
    name: "help",
    source: __dirname,
    validoptions: {
        helpfile: true,
        target: true
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
    help: shellcom.help.link,
    exitOnError: true,
    main: function (opts) {
        console.log(opts);
    },
    sub: function (opts) {
        //add support for opening html as a new window.
            if(fs.existsSync(opts.helpfile + '.html')){
                let helpfile = opts.helpfile +'.html';
                if(opts.target != "window"){
                    bigshell.ui.fragmentAppend(helpfile, opts.target);
                }
            } else {
                let helpfile = opts.helpfile +'.json';
                generators.htmlgenerator.link({input: helpfile, target: opts.target});
            }
        console.log(opts.payload);
    }
};

exports.def = def;