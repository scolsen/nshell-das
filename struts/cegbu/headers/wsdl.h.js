const fs = require('fs');
const shell = require('../../built-ins/shell');

let log = si => console.log("Stdout", si);
let unzip = opts => shell.sh.link({command: "unzip " + opts.file + " -d " + opts.dir, shell: opts.shell, mode: "async", con: opts.con});
let rname = opts => fs.rename(opts.dir, "mydir");

let def = {
    name: "wsdl",
    source: __dirname,
    validoptions: {
        file: true,
        shell: true,
        dir: true,
        dependency: {
            1: shell.sh
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
        unzip(opts);
        rname(opts);
    },
    sub: function (opts) {
            return unzip(opts);
    }
};

exports.def = def;