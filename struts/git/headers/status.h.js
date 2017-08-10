
const shell = require('../../built-ins/shell');

function log (shellinterface){
    shellinterface.getOutput();
    shellinterface.getErr();
}

function gitStatus(opts){
    shell.sh.link({command: "git status", shell: opts.shell, callback: log});
}

let def = {
    name: "gitstatus",
    source: __dirname,
    validoptions: {
        shell: true,
        dependency: {
            proc: shell.sh,
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
        gitStatus(opts);
    },
    sub: function (opts) {
        return gitStatus(opts);
    }
};

exports.def = def;